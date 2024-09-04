const { Job, Profile, Contract } = require('../models');
const Sequelize = require('sequelize');

exports.depositBalance = async (req, res) => {
    const { userId } = req.params;
    const depositAmount = req.body.amount;

    if (req.profile.id !== parseInt(userId)) return res.status(403).end();

    const client = await Profile.findOne({ where: { id: userId } });
    if (!client || client.type !== 'client') return res.status(404).end();

    const unpaidJobs = await Job.findAll({
        where: {
            paid: {
                [Sequelize.Op.is]: null
            }
        },
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

    await client.update({ balance: (parseFloat(client.balance) + parseFloat(depositAmount)).toFixed(2) });

    res.json({ message: 'Deposit successful', balance: client.balance });
};
