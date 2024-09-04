const { Profile, Contract, Job } = require('../models');
const Sequelize = require('sequelize');

exports.getBestProfession = async (req, res) => {
    const { start, end } = req.query;

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Please provide start and end dates' });
    }

    const paidJobsPeriod = await Job.findAll({
        where: {
            paid: true,
            [Sequelize.Op.or]: [
                {
                    createdAt: {
                        [Sequelize.Op.between]: [startDate, endDate]
                    }
                },
                {
                    updatedAt: {
                        [Sequelize.Op.between]: [startDate, endDate]
                    }
                }
            ]
        },
        include: [
            {
                model: Contract,
                include: [
                    {
                        model: Profile,
                        as: 'Contractor',
                        where: { type: 'contractor' }
                    }
                ]
            }
        ]
    });

    if (paidJobsPeriod.length == 0) return res.status(404).end('No paid jobs performed in that period of time');

    const earnedMoneyPerProfession = paidJobsPeriod.reduce((result, job) => {
        const profession = job.Contract.Contractor.profession;
        if (typeof result[profession] == 'undefined') {
            result[profession] = job.price;
        } else {
            result[profession] += job.price;
        }
        return result;
    }, {});

    const bestProfession = Object.entries(earnedMoneyPerProfession).reduce((a, b) => a[1] > b[1] ? a : b);

    res.json(`The best profession is ${bestProfession[0]}, The total earned is ${bestProfession[1]}.`);
};

exports.getBestClients = async (req, res) => {
    const { start, end, limit } = req.query;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const countLimit = parseInt(limit ? limit : 2);

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Please provide start and end dates' });
    }
    if (isNaN(countLimit)) return res.status(500).end('Limit must be a number');

    const paidJobsPeriod = await Job.findAll({
        attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'totalPaid'],],
        order: [[Sequelize.fn('sum', Sequelize.col('price')), 'DESC']],
        where: {
            paid: true,
            paymentDate: {
                [Sequelize.Op.between]: [startDate, endDate]
            }
        },
        include: [
            {
                model: Contract,
                include: [
                    {
                        model: Profile,
                        as: 'Client',
                        where: { type: 'client' },
                        attributes: ['firstName', 'lastName']
                    }
                ],
                attributes: ['ClientId']
            }
        ],
        group: 'Contract.ClientId',
        limit: countLimit
    });

    const paidClient = paidJobsPeriod.map(function (x) {
        return {
            id: x.Contract.ClientId,
            fullName: x.Contract.Client.firstName + ' ' + x.Contract.Client.lastName,
            paid: x.dataValues.totalPaid
        };
    });

    res.json(paidClient);
};
