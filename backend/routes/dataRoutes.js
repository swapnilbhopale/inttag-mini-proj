const express = require("express");
const { createEmp, getEmp, updateEMp, deleteEmp } = require('../services/dataService')
const router = express.Router();

//create data
router.post("/create", createEmp);

// get data
router.get('/data', getEmp)

// update data
router.put('/update-emp', updateEMp)

//delete empData
router.delete('/del-emp/:email', deleteEmp)

module.exports = router