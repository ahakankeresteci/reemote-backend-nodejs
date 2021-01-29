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
const { update } = require('../models/user')
const jsonParser = bodyParser.json()


//kullanıcıya kendi profil bilgilerini gönder
router.get('/profile', auth, async (req, res) => {
    const email = req.userData.email
    const user = await users.findOne({ email: email ,isDeleted:false})
    //parolayı sil
    return res.json({
        user_name: user.user_name,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isActive: user.isActive
    })
})

//başka kullanıcıların bilgilerini gönder
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await users.findOne({ user_name: req.params.username, isDeleted: false })
        const jobadList = await jobads.find({author_user_name: req.params.username, isDeleted:false})
        //özel bilgileri sil
        return res.json({
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            jobads: jobadList,
            location: user.location,
            job: user.job,
            website: user.website
        })
    }
    catch (err) { res.status(400).send("invalid username") }
})

//kullanıcıların ilanlarını gönder
router.get('/:username/jobads', async (req, res) => {
    const jobads = await jobads.find({ author_user_name: req.params.username, isDeleted: false })
    return res.json({ jobads: jobads })
})


router.post('/register', registerValidation, jsonParser, async (req, res) => {

    try {
        const errors = validationResult(req).isEmpty();
        if (errors) {
            console.log("invalid password")
            return res.status(400).send('Invalid password or email');
        }

        const isEmailExist = await users.findOne({ email: req.body.email,isDeleted:false });

        if (isEmailExist) {
            console.log("invalid email")
            return res.status(400).send('Email already exist');
        }


        const isUsernameExist = await users.findOne({ user_name: req.body.user_name ,isDeleted:false})
        if (isUsernameExist) {
            console.log("username exist")
            return res.status(400).send('Username already exist');
        }

        let newUser = await users(req.body).save()

        
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" })

        res.status(201).json({ success: true, token: token, expiresIn: 2, data: { mail: newUser.email, username: newUser.user_name } });


    }
    catch (err) {
        return res.status(400).send(err);
    }
})


router.post('/login', jsonParser, async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const theUser = await users.findOne({
        email: email,
        isDeleted: false
    })
    if (!theUser) { return res.status(400).send("Wrong Password or Email") }

    isPasswordCorrect = await bcrypt.compare(password, theUser.password)

    console.log("correct : " + isPasswordCorrect)

    if (!isPasswordCorrect) { return res.status(400).send("Wrong Password or Email") }

    
    const token = jwt.sign({ id: theUser._id, email: theUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" })
    res.status(200).json({ success: true, token: token, expiresIn: 2, data: { mail: theUser.email, username: theUser.user_name, } });

})


router.delete('/profile', auth, async (req, res) => {
   
    try {
        const theUser = await users.findOne({ _id: req.userData.id , isDeleted:false})

        await jobads.updateMany({ author_user_name: theUser.user_name },
            {
                isDeleted: true,
                isActive: false
            })

        await users.updateOne({ _id: req.userData.id }, {
            isDeleted: true,
            isActive: false
        })
        res.sendStatus(200)

    } catch (err) { res.status(400).send(err) }

})

router.put('/profile', auth, jsonParser, async (req, res) => {
    try {
        const id = req.userData.id
        const updateInfo = req.body
        const theUser = await users.findOne({ _id: id ,isDeleted:false})
        
        if (updateInfo.user_name && updateInfo.user_name != theUser.user_name) { //username değişirse postları da güncelle
            await jobads.updateMany({ author_user_name: theUser.user_name }, { author_user_name: updateInfo.user_name })
        }

        if (updateInfo.password) {
            updateInfo.password = await bcrypt.hash(updateInfo.password, 10)
        }
        
        await users.updateOne({ _id: id ,isDeleted:false}, updateInfo)
        let updated = await users.findOne({_id: id})
      
        console.log("updated: "+updated)
        res.status(200).send(updated)

    }

    catch (err) { res.status(400).send("error: update fail") }
})

module.exports = router