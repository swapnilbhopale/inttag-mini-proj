const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const driver = require("../config/neo4j");
const logger = require('../utils/logger')

exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const session = driver.session();
    try {
logger.info(`Create new User POST API call`)
        const checkUser = await session.run(
            "MATCH (u:User {email:$email}) RETURN u ",
            { email },
        );
        if (checkUser.records.length > 0) {
            logger.warn(`Duplicate User Register Attempt: ${email}`)
            return res.status(400).json({
                message: "user already exist.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await session.run(
            `CREATE (u:User {
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password
        })`,
            {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        );

        logger.info(`New User resgistered successfully: ${email}`)
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        logger.error(`Error in Create New user API call: ${err.message}`)
        res.status(500).json({ message: err.message });
    } finally {
        await session.close();
        logger.info(`Neo4j session closed.`)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const session = driver.session();

    try {
        logger.info(`Login Attempt by user: ${email}`)
        const result = await session.run(
            "MATCH (u:User {email: $email}) RETURN u",
            {
                email,
            },
        );
        // console.log(result.records);
        if (result.records.length === 0) {
            logger.warn(`Invalid Email attempt by: ${email}`)
            return res.status(400).json({ message: "Invalid Email" });
        }

        const user = (await result).records[0].get("u").properties;
        // console.log(user);

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            logger.warn(`Invalid Password attempt by: ${email}`)
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        logger.info(`User logged successfully: ${email}`)
        res.json({
            message: "user loggedIn successfully.",
            token,
            user,
        });
    } catch (err) {
        logger.error(`error in user login ${err.message}`)
        res.status(500).json({ message: err.message });
    } finally {
        await session.close();
        logger.info(`Neo4j sesssion closed for loggin POST API`)
    }
}