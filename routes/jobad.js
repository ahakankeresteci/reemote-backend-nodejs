const express = require('express')
const { ObjectID } = require('mongodb')
const router = express.Router()
const jobad = require('../models/jobad')



//get all job advertisements
router.get('/', async (req, res) => {
  let pageNumber = parseInt(req.query.page)
  let pageSize = parseInt(req.query.size)

  if (!pageNumber) { pageNumber = 0 }
  if (!pageSize) { pageSize = 5 }

  try {
    let totalElements = await jobad.estimatedDocumentCount()
    let totalPages = parseInt(totalElements / pageSize) + 1

    let jobadsList = await jobad.find({}).limit(pageSize * 1).skip(pageNumber * pageSize)

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

//get categorized job advertisements
router.get('/search/findByCategory', async (req, res) => {
  let category = req.query.category;

  let pageNumber = parseInt(req.query.page)
  let pageSize = parseInt(req.query.size)

  if (!pageNumber) { pageNumber = 0 }
  if (!pageSize) { pageSize = 5 }

  try {
    let totalElements = await jobad.countDocuments({category: category})
    let totalPages = parseInt(totalElements / pageSize) + 1

    let jobadsList = await jobad.find({
      category: category
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


//get job advertisements list by search
router.get('/search/findByTitleLikeIgnoreCase', async (req, res) => {
  let keyword = req.query.title
  let keyRegex = new RegExp(keyword, "i")

  let pageNumber = parseInt(req.query.page)
  let pageSize = parseInt(req.query.size)

  if (!pageNumber) { pageNumber = 0 }
  if (!pageSize) { pageSize = 5 }

  try {
    let totalElements = await jobad.countDocuments({title: keyRegex})
    let totalPages = parseInt(totalElements / pageSize) + 1

    let jobadsList = await jobad.find({
      title: keyRegex
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

//get job ad by id
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


module.exports = router