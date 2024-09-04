const { Job, Profile, Contract } = require('../models');
const Sequelize = require('sequelize');

exports.getUnpaidJobs = async (req, res) => {
    const profileId = req.profile.id;
    const jobs = await Job.findAll({
        where: {
            paid: {
                [Sequelize.Op.is]: null
            }
        },
        include: [
            {
                model: Contract,
                where: {
                    status: 'in_progress',
                    [Sequelize.Op.or]: [
                        { ContractorId: profileId },
                        { ClientId: profileId }
                    ]
                }
            }
        ]
    });

    res.json(jobs);
};

exports.payJob = async (req, res) => {
    const { job_id } = req.params;
    const profile = req.profile;

    const job = await Job.findOne({
        where: { id: job_id },
        include: [{ model: Contract }]
    });

    if (!job) return res.status(404).end();

    const contract = job.Contract;
    if (profile.id !== contract.ClientId) return res.status(403).end();

    const client = await Profile.findOne({ where: { id: contract.ClientId } });
    const contractor = await Profile.findOne({ where: { id: contract.ContractorId } });

    if (client.balance < job.price) return res.status(400).json({ message: 'Insufficient balance' });

    await client.update({ balance: client.balance - job.price });
    await contractor.update({ balance: contractor.balance + job.price });
    await job.update({ paid: true, paymentDate: new Date() });

    res.json({ message: 'Payment successful' });
};

exports.depositBalance = async (req, res) => {
    const { userId } = req.params;
    const depositAmount = req.body.amount;

    if (req.profile.id !== parseInt(userId)) return res.status(403).end();

    const client = await Profile.findOne({ where: { id: userId } });
    if (!client || client.type !== 'client') return res.status(404).end();

    const unpaidJobs = await Job.findAll({
        where: { paid: false },
        include: [
            {
                model: Contract,
                where: {
                    ClientId: client.id,
                    status: 'in_progress'
                }
            }
        ]
    });

    const totalUnpaid = unpaidJobs.reduce((sum, job) => sum + job.price, 0);
    const maxDeposit = totalUnpaid * 0.25;

    if (depositAmount > maxDeposit) {
        return res.status(400).json({ message: `Deposit exceeds 25% of total unpaid jobs` });
    }

    await client.update({ balance: client.balance + depositAmount });

    res.json({ message: 'Deposit successful', balance: client.balance });
};
