const express =  require ("express");
const expressAsyncHandler = require ("express-async-handler");
const Order  = require ("../model/orderModel.js");
const { isAuth } =  require ("../utils.js");
const orderRouter = express.Router();

orderRouter.get('/orders',isAuth, expressAsyncHandler( async(req,res) => {
  const order = await Order.find({user: req.user._id});
  res.send(order);
}))


orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        informationAddress: req.body.informationAddress,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        // itemsPrice: req.body.itemsPrice,
        // taxPrice: req.body.taxPrice,
        // totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      console.log(order);
      res.send(order);
    } else {
      res.status(404).send({ messageT: "order not found" });
    }
  })
);




module.exports =  orderRouter;
