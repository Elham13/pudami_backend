const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const {
    getHome,
    postPayment,
    postProducts,
    postRegister,
} = require('./controllers');

router.get('/', getHome);

router.post('/razorpay', postPayment)
router.post('/products', upload.single('image'), postProducts)
router.post('/register', postRegister)
module.exports = router;