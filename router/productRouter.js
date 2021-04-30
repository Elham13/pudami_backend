const express = require ("express");
const expressAsyncHandler = require ("express-async-handler");
const fs = require('fs');
const Product = require ("../models/productsModel");
const data = require ("../data.js");
const upload = require('../config/multer');
// const { getProduct } = require ("../controllers/productController.js");

const productRouter = express.Router(); 

productRouter.post("/seed", async (req, res) => {
  const {name, price, buylimit, desc, img} = req.body
  const prod = {
    name: name,
    image: img,
    description: desc,
    price: price, 
    orderLimit: buylimit,
  }

  const newProd = new Product(prod);
  await newProd.save();
  res.send({success: "New product added successfully"});
});

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
    res.send(product);
  } else{
    res.status(404).send("product is not exist");
  }
}))

module.exports = productRouter;
