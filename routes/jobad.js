const express = require('express')
const { ObjectID } = require('mongodb')
const auth = require('../middleware/auth')
const router = express.Router()
const jobad = require('../models/jobad')
const jobadValidation = require('../validations/jobad')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const users = require('../models/user')

//get all job advertisements
router.get('/', async (req, res) => {
  let pageNumber = parseInt(req.query.page)
  let pageSize = parseInt(req.query.size)

  if (!pageNumber) { pageNumber = 0 }
  if (!pageSize) { pageSize = 5 }

  try {
    let totalElements = await jobad.estimatedDocumentCount()
    let totalPages = parseInt(totalElements / pageSize) + 1

    let jobadsList = await jobad.find({ isDeleted: false }).limit(pageSize * 1).skip(pageNumber * pageSize)

    return res.json({
      jobads: jobadsList,
      page: {
        size: pageSize,
        totalElements: totalElements,
        totalPages: totalPages,
        number: pageNumber
      }
    });
  }
  catch (err) {
    return res.status(400).send(err);
  }
})

//kategoriye göre ilanları listele
router.get('/search/findByCategory', async (req, res) => {
  let category = req.query.category;

  let pageNumber = parseInt(req.query.page)
  let pageSize = parseInt(req.query.size)

  if (!pageNumber) { pageNumber = 0 }
  if (!pageSize) { pageSize = 5 }

  try {
    let totalElements = await jobad.countDocuments({ category: category, isDeleted: false })
    let totalPages = parseInt(totalElements / pageSize) + 1

    let jobadsList = await jobad.find({
      category: category, isDeleted: false
    }).limit(pageSize * 1).skip(pageNumber * pageSize)
    return res.json({
      jobads: jobadsList,
      page: {
        size: pageSize,
        totalElements: totalElements,
        totalPages: totalPages,
        number: pageNumber
      }
    });
  }

  catch (err) {
    return res.status(400).send(err);
  }
})


//Search key'e göre ilan listele
router.get('/search/findByTitleLikeIgnoreCase', async (req, res) => {
  let keyword = req.query.title
  let keyRegex = new RegExp(keyword, "i")

  let pageNumber = parseInt(req.query.page)
  let pageSize = parseInt(req.query.size)

  if (!pageNumber) { pageNumber = 0 }
  if (!pageSize) { pageSize = 5 }

  try {
    let totalElements = await jobad.countDocuments({ title: keyRegex })
    let totalPages = parseInt(totalElements / pageSize) + 1

    let jobadsList = await jobad.find({
      title: keyRegex,
      isDeleted: false
    }).limit(pageSize * 1).skip(pageNumber * pageSize)

    return res.json({
      jobads: jobadsList,
      page: {
        size: pageSize,
        totalElements: totalElements,
        totalPages: totalPages,
        number: pageNumber
      }
    })
  }
  catch (err) {
    return res.status(400).send(err);
  }
})

//id ile ilan listele
router.get('/:id', async (req, res) => {
  let id = req.params.id
  try {
    let thejobad = await jobad.find({
      _id: ObjectID(id)
    })
    return res.json(thejobad[0])
  }
  catch (err) {
    return res.status(400).send(err);
  }
})

router.post('/create', auth, jsonParser, jobadValidation, async (req, res) => {
  try {
    let email = req.userData.email
    let user = await users.findOne({ email: email })
    req.body.author_user_name = user.user_name
    const createdAd = await jobad(req.body).save()
    res.status(201).send(createdAd)
  }
  catch (err) {
    res.status(400).send("error: " + err)
  }
})

module.exports = router