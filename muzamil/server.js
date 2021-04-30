import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import Order from "./model/orderModel.js";

//env config
dotenv.config();

const app = express();
const PORT = process.env.PORT || "4000";

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/pudamifresh", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.status(200).send("hellooo pudami fresh");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, (req, res) => {
  console.log(`sever started in port : ${PORT}`);
});
