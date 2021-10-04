const express = require('express');
const router = express.Router();

require('./routes/candidateRoute')(router);
require('./routes/helpersRoute')(router);
require('./routes/usersRoute')(router);

module.exports = router;