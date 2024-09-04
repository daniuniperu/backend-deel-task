const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const contractRoutes = require('./routes/contractRoutes');
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/adminRoutes');
const balanceRoutes = require('./routes/balanceRoutes');

const { swaggerUi, swaggerSpec } = require('./swagger');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);



app.use('/contracts', contractRoutes);
app.use('/jobs', jobRoutes);
app.use('/admin', adminRoutes);
app.use('/balances', balanceRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;


