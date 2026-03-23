const express = require("express");
const driver = require("../config/neo4j");

const router = express.Router();

//create data
router.post("/create", async (req, res) => {
  const { name, email, designation, phone, address } = req.body;
  const session = driver.session();
});
