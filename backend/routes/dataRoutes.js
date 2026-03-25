const express = require("express");
const { createEmp, getEmp, deleteEmp } = require('../services/dataService')
const router = express.Router();

//create data
router.post("/create", createEmp);

// get data
router.get('/data', getEmp)

//delete empData
router.delete('/del-emp/:email', deleteEmp)

module.exports = router