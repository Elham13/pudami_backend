require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRouter = require('./router/productRouter');
const userRouter = require('./router/userRouter');
const orderRouter = require('./router/orderRouter');

const app = express();
connectDB()

const corsOptions = {
    origin: "http://localhost:3000", 
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
  
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended: true, limit: "50mb"}));

app.use("/api", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
    res.status(200).send("hellooo pudami fresh");
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));