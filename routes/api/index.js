
const express = require('express');
const router = express.Router();

const camisasRoutes = require('./camisas/index');
router.use("/camisas", camisasRoutes);


module.exports = router;
