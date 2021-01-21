const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { loginValidation, registerValidation } = require('../validations/user')
const { body, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const router = express.Router()
const users = require('../models/user')
const jobads = require('../models/jobad')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()



router.get('/profile', auth, async (req, res) => {
    let email = req.userData.email
    let user = await users.findOne({ email: email })
    delete user.password
    return res.json(user)
})

router.post('/register', registerValidation, jsonParser, async (req, res) => {

    try {
        const errors = validationResult(req).isEmpty();
        if (errors) {
            console.log("invalid password")
            return res.status(400).send('Invalid password or email');
        }

        const isEmailExist = await users.findOne({ email: req.body.email });

        if (isEmailExist) {
            console.log("invalid email")
            return res.status(400).send('Email already exist');
        }


        const isUsernameExist = await users.findOne({ user_name: req.body.user_name })
        if (isUsernameExist) {
            console.log("username exist")
            return res.status(400).send('Username already exist');
        }

        let newUser = await users(req.body).save()

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" })

        res.status(201).json({ success: true, token: token,expires:"2h", data: { mail: newUser.email, username: newUser.user_name } });


    }
    catch (err) {
        return res.status(400).send(err);
    }
})


router.post('/login',jsonParser, async (req, res) => {
    
    const email = req.body.email
    const password = req.body.password

    const theUser = await users.findOne({
        email: email,
    })
    if (!theUser){return res.status(400).send("Wrong Password or Email") }
    
    isPasswordCorrect = await bcrypt.compare(password, theUser.password)
    
    console.log("correct : "+isPasswordCorrect)

    if (!isPasswordCorrect){return res.status(400).send("Wrong Password or Email") }

    console.log(theUser)
    let expires= "2h"
    const token = jwt.sign({ id: theUser._id, email: theUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: expires })
    res.status(200).json({ success: true, token: token, expires: expires, data: { mail: theUser.email, username: theUser.user_name } });

})


module.exports = router