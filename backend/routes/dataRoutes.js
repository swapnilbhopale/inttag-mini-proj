const express = require("express");
const authMiddleWare = require('../middleware/authMiddleware')
const { createEmp, getEmp, updateEMp, deleteEmp } = require('../services/dataService')
const validate = require('../middleware/validate')
const { createEmpValidator, updateEmpVlaidator, deleteEmpValidator } = require('../validators/empValidators')
const router = express.Router();

//create data
router.post("/create", createEmpValidator, validate, authMiddleWare, createEmp);

// get data
router.get('/data', authMiddleWare, getEmp)

// update data
router.put('/update-emp', updateEmpVlaidator, validate, authMiddleWare, updateEMp)

//delete empData
router.delete('/del-emp/:email', deleteEmpValidator, validate, authMiddleWare, deleteEmp)

module.exports = router