const express = require('express')
const router = express.Router()
const Listing = require ('../models/listing')
const session = require('express-session')
const isSignedIn = require('../middleware/is-signed-in')


// View new listing form
router.get('/new',(req, res) => {
  res.render('listings/new.ejs')
})

router.post('/', isSignedIn, async (req, res) => {
  try {
    req.body.seller = req.session.user._id
    const addedListing = await Listing.create(req.body)
    res.redirect('/listings/')
  } catch (err){
    console.log(error)
    res.send('Something went wrong')
  }
})

router.get('/', async (req, res) => {
  const foundListings = await Listing.find()
  res.render('Listings/index.ejs', {foundListings: foundListings})
})

router.get('/:listingId', async (req, res) => {
  const foundListings = await Listing.findById(req.params.listingId).populate("seller")
  res.render('listings/show.ejs', {foundListing: foundListings})
})


router.delete('/:listingId', async (req, res) => {
  const  foundListing = await Listing.findById(req.params.listingId).populate("seller")

  if (foundListing.seller._id.equals(req.session.user._id)) {
    await foundListing.deleteOne()
    return res.redirect('/listings')
  }

  return res.send('Not authorized')
})


router.get('/:listingId/edit', async (req, res) => {

  const  foundListing = await Listing.findById(req.params.listingId).populate("seller")

  if (foundListing.seller._id.equals(req.session.user._id)) {
    return res.render('listings/edit.ejs', { foundListing: foundListing })
  }else {
    return res.send('Not authorized')
  }
})


router.put('/:listingId', (req, res) => {
  res.send(`You updated listing: ${req.params.listingId}`)
})

module.exports = router
