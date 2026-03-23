const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const router = express.Router()

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "user already exist."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName, lastName, email, password: hashedPassword
        })

        await newUser.save()
        res.status(201).json({
            message: "user regiserd successfully.",
            User: newUser,
            status: "success",

        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" })

        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Password" })

        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({
            message: "user loggedIn successfully.",
            token, user
        })

    }
    catch (err) {
        res.status(500).send("Server Error");
    }
})


const authMiddleWAre = require('../middleware/authMiddleware')

router.get('/dashboard', authMiddleWAre, (req, res) => {
    res.json({
        message: "Welcome to dashboard",
        userId: req.user.id
    })
})

module.exports = router