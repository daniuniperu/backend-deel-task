const express = require('express');
const { getContractById, getContracts } = require('../controllers/contractController');
const { getProfile } = require('../middleware/getProfile');

const router = express.Router();

/**
 * @swagger
 * /contracts:
 *   get:
 *     summary: Retrieve a list of contracts
 *     responses:
 *       200:
 *         description: A list of contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The contract ID
 *                   title:
 *                     type: string
 *                     description: The contract title
 */
router.get('/', getProfile, getContracts);

router.get('/:id', getProfile, getContractById);



module.exports = router;
