const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'marketplace-listings',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});


module.exports = multer({storage: storage});