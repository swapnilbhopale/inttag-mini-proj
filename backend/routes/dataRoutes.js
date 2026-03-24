const express = require("express");
const driver = require("../config/neo4j");

const router = express.Router();

//create data
router.post("/create", async (req, res) => {
  const { name, email, designation, phone, address } = req.body;
  const session = driver.session();
  try {
    await session.run(
      `CREATE (e:Employee {
      name: $name,
      email: $email,
      designation: $designation,
      phone: $phone,
      address: $address
      })
      `, { name, email, designation, phone, address }
    )
    res.json({ message: "Employee created successfully" })
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
  finally {
    await session.close()
  }
});


// get data
router.get('/data', async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (e:Employee) RETURN e"
    );

    const employess = result.records.map(records => records.get('e').properties)
    res.json(employess)
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  } finally {
    session.close()
  }
})
module.exports = router