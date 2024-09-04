const { Contract } = require('../models');
const Sequelize = require('sequelize');

exports.getContractById = async (req, res) => {
    const { id } = req.params;
    const profileId = req.profile.id;

    const contract = await Contract.findOne({
        where: {
            id,
            [Sequelize.Op.or]: [
                { ContractorId: profileId },
                { ClientId: profileId }
            ]
        }
    });

    if (!contract) return res.status(404).end();
    res.json(contract);
};

exports.getContracts = async (req, res) => {
    const profileId = req.profile.id;

    const contracts = await Contract.findAll({
        where: {
            status: {
                [Sequelize.Op.ne]: 'terminated'
            },
            [Sequelize.Op.or]: [
                { ContractorId: profileId },
                { ClientId: profileId }
            ]
        }
    });

    res.json(contracts);
};
