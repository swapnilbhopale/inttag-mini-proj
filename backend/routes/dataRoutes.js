const express = require("express");
const authMiddleWare = require('../middleware/authMiddleware')
const { createEmp, getEmp, updateEMp, deleteEmp } = require('../services/dataService')
const router = express.Router();

//create data
router.post("/create", authMiddleWare, createEmp);

// get data
router.get('/data', authMiddleWare, getEmp)

// update data
router.put('/update-emp', authMiddleWare, updateEMp)

//delete empData
router.delete('/del-emp/:email', authMiddleWare, deleteEmp)

module.exports = router