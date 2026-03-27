const driver = require("../config/neo4j");
const logger = require("../utils/logger")

exports.createEmp = async (req, res) => {
    const { name, email, designation, phone, address } = req.body;
    const session = driver.session();
    try {
        logger.info(`Create Emp API Call for email: ${email}`)

        const isEmailPresent = await session.run(
            `MATCH (e:Employee {email: $email}) RETURN e`, { email }
        )

        if (isEmailPresent.records.length > 0) {
            logger.warn(`Duplicate email attempt: ${email}`)
            return res.status(400).json({ message: "Email already exists" })
        }

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
        logger.info(`Employee created successfully: ${email}`)
        res.json({ message: "Employee created successfully" })
    }
    catch (err) {
        logger.error(`Error in create Emp API: ${err.message}`)
        res.status(500).json({ message: err.message })
    }
    finally {
        await session.close()
        logger.info(`Neo4j session closed for email: ${ email }`)
    }
}

exports.getEmp = async (req, res) => {
    const session = driver.session();

    try {
        logger.info(`Get Emp API Call`)
        const result = await session.run(
            "MATCH (e:Employee) RETURN e "
        );

        const employess = result.records.map(records => records.get('e').properties)
        logger.info(`Emp ${employess.length} fetched.`)
        res.json(employess)
    }
    catch (err) {
        logger.error(`error in get Emp API call: ${err.message}`)
         res.status(500).json({ message: err.message })
    } finally {
        session.close()
        logger.info(`Neo4j session closed for get Emp API`)
    }
}

exports.deleteEmp = async (req, res) => {
    const email = req.params.email;
    const session = driver.session();

    try {
        logger.info(`Delete Emp API Call for email: ${email}`)
        
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
            logger.warn(`Epm not found for delete API call ${email}`)
            return res.status(404).json({ message: "User not found" });
        }

        logger.info(`EMP deleted sucessfully ${email}`)
        return res.status(200).json({ message: "User deleted successfully" });

    } catch (err) {
        logger.error(`error in delete API call: ${err.message}`)
        return res.status(500).json({ message: err.message });
    } finally {
        await session.close();
        logger.info(`Neo4j session closed for delete Emp API`)

    }
};

exports.updateEMp = async (req, res) => {
    const { name, email, designation, phone, address } = req.body
    const session = driver.session()

    try {
        logger.info(`Emp update API call for ${email}`)
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
            logger.warn(`Emp not found for update ${email}`)
            res.status(404).json({ message: "Employee not found" })
        }

        const updatedEmp = result.records[0].get('e').properties
        logger.info(`Emp updated successfully ${email}`)
        return res.status(200).json({
            message: "Employee updated successfully",
            data: updatedEmp
        })
    }
    catch (err) {
        logger.error(`error in update API call ${err.message}`)
        res.status(500).json({
            message: err.message
        });
    }
    finally {
        await session.close()
        logger.info(`Neo4j session closed for update Emp API call`)
    }
}