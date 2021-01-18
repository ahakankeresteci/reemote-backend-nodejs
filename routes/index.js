const express = require('express')
const router = express.Router()
const db = require('../mongodb')

router.get('/', (req,res) =>{

    result = db.collections
    res.send(result)
})

module.exports = router
