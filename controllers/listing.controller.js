const express = require('express')
const router = express.Router()
const Listing = require ('../models/listing')

// View new listing form
router.get('/new',(req, res) => {
  res.render('listing/new.ejs')
})

router.post('/', async (req, res) => {
  const addedListing = await Listing.create(req.body)
  console.log(addedListing)
  res.send('you submitted')
})

module.exports = router