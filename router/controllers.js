const RazorPay = require('razorpay')
// const Product = require('../models/products');
const fs = require('fs');


const getHome = async (req, res) => {
    const products = await Product.find()
    res.send({data: products});
}

const razorpay = new RazorPay({
    key_id: 'rzp_test_yYamiD2aGFZQOR',
    key_secret: 'KXDMtfu6almqoOr5QyJ89gY4',
})
const postPayment = async (req, res) => {
    razorpay.orders.create({
        amount,
        currency,
        receipt,
        payment_capture,
        notes
    })
}

const postProducts = async (req, res) => {
    const {name, price, buylimit} = req.body
    const prod = {
        Name: name,
        Price: price, 
        BuyLimit: buylimit,
        Photo: {
            data: fs.readFileSync('./uploads/' + req.file.filename),
            contentType: req.file.mimetype,
        }
    }

    const newProd = new Product(prod);
    await newProd.save();
    res.send({success: "New product added successfully"});
}

const postRegister = async (req, res) => {
    const {fullName, email, password} = req.body;
    console.log("Body: " ,req.body)
    res.send({success: 'Yay'})
}

module.exports = {
    getHome, 
    postPayment,
    postProducts,
    postRegister,
}