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
            "MATCH (e:Employee) RETURN e "
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
    const email = req.params.email;
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (e:Employee {email: $email})
            WITH COUNT(e) AS count, collect(e) AS nodes
            FOREACH (n IN nodes | DELETE n)
            RETURN count
            `,
            { email }
        );

        const count = result.records[0].get('count').toInt();

        if (count === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    } finally {
        await session.close();
    }
};

exports.updateEMp = async (req, res) => {
    const { name, email, designation, phone, address } = req.body
    const session = driver.session()

    try {
        const result = await session.run(
            `
            MATCH (e:Employee {email: $email})
            SET e.name = $name,
            e.email = $email,
            e.designation = $designation,
            e.phone = $phone,
            e.address = $address
            RETURN e`, { name, email, designation, phone, address }
        )

        if (result.records.length === 0) {
            res.status(404).json({ message: "Employee not found" })
        }

        const updatedEmp = result.records[0].get('e').properties
        return res.status(200).json({
            message: "Employee updated successfully",
            data: updatedEmp
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
    finally {
        await Selection.close()
    }
}