const driver = require("../config/neo4j");

exports.createEmp = async (req, res) => {
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
}

exports.getEmp = async (req, res) => {
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
}

exports.deleteEmp = async (req, res) => {
    const { email } = req.body
    const session = driver.session()

    try {
        const checkEmail = await session.run(
            "MATCH (e:Employee {eamil: $email} RETURN e)", { email }
        );
        if (checkEmail.records.length == 0) {
            return res.status(400).json({ message: "user not found.", })
        }
        else {
            await session.run(
                "MATCH (e:Employee {email: $email}) DELETE e", { email }
            )
            res.status(200).json({ message: "User deleted successfully" })
        }

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
    finally {
        await session.close()
    }
}