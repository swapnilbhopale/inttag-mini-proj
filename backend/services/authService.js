const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");
const driver = require("../config/neo4j");

exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const session = driver.session();
    try {
        const checkUser = await session.run(
            "MATCH (u:User {email:$email}) RETURN u ",
            { email },
        );
        if (checkUser.records.length > 0) {
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
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await session.close();
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const session = driver.session();

    try {
        const result = await session.run(
            "MATCH (u:User {email: $email}) RETURN u",
            {
                email,
            },
        );
        // console.log(result.records);
        if (result.records.length === 0) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const user = (await result).records[0].get("u").properties;
        // console.log(user);

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({
            message: "user loggedIn successfully.",
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await session.close();
    }
}