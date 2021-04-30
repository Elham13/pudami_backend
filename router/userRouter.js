const express = require ("express");
const data =require ("../data.js"); 
const User =require('../models/userModel');
const bcrypt =require ("bcryptjs");
const upload = require('../config/multer');
const expressAsyncHandler= require ("express-async-handler");
const { generateToken, isAuth } = require ("../utils.js");

const userRouter = express.Router();

userRouter.get( 
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove();
    const createUsers = await User.insertMany(data.users);

    res.send({ createUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
          profile:{
            img: user.profile.img,
            firstname: user.profile.firstname,
            lastname: user.profile.lastname,
            gender: user.profile.gender,
            phone: user.profile.phone,
            busniusename: user.profile.busniusename,
            licencecode: user.profile.licencecode
          }
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name, 
      email: req.body.email.toLowerCase(),
      password: bcrypt.hashSync(req.body.password, 8),
      profile:{
        img: "",
        firstname: "",
        lastname: "",
        gender:"",
        phone: "",
        busniusename: "",
        licencecode: "",
      } 
    });

    const createUser = await user.save();

    res.send({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      isAdmin: createUser.isAdmin,
      token: generateToken(createUser),
      profile:{
        img: createUser.profile.img,
        firstname: createUser.profile.firstname,
        lastname: createUser.profile.lastname,
        gender: createUser.profile.gender,
        phone: createUser.profile.phone,
        busniusename: createUser.profile.busniusename,
        licencecode: createUser.profile.licencecode
    }})
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.profile.img = req.body.img || user.profile.img;
      user.profile.firstname = req.body.firstname || user.profile.firstname;
      user.profile.lastname = req.body.lastname || user.profile.lastname;
      user.profile.gender = req.body.gender || user.profile.gender;
      user.profile.phone = req.body.phone || user.profile.phone;
      user.profile.busniusename =
        req.body.busniusename || user.profile.busniusename;
      user.profile.licencecode =
        req.body.licencecode || user.profile.licencecode;
      user.email = req.body.email || user.email;
      user.name = req.body.name || user.name;
      // if (req.body.password) {
      //   user.password = bcrypt.hashSync(req.body.password, 8);
      // }
      const updateUser = await user.save();
      res.send({
        _id: updateUser._id,
        profile: {
          img: updateUser.profile.img,
            firstname: updateUser.profile.firstname,
            lastname: updateUser.profile.lastname,
            gender: updateUser.profile.gender,
            phone: updateUser.profile.phone,
            busniusename: updateUser.profile.busniusename,
            licencecode: updateUser.profile.licencecode,
        },
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser),
        name: updateUser.name,
      });
    }
  })
);

userRouter.post('/changePassword', isAuth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const {validUser, oldPassword, newPassword} = req.body
  const validPassword = bcrypt.compareSync(oldPassword, user.password)
  
  if(!validUser){
    // Verify the user by comparing his old password with hashed one
    if(validPassword){
      res.send({
        validUser: true,
        token: generateToken(user),
        message: 'Old password in correct'
      })
    }else{
      res.send({
        validUser: false,
        token: '',
        message: 'Password did not match with your old password, Please try again!'
      })
    }
  }else{
    user.password = bcrypt.hashSync(newPassword, 8)
    const savedUser = await user.save();
    res.send({
      validUser: true,
      token: generateToken(savedUser),
      message: "Password changed successfully"
    })
  }
})

module.exports =  userRouter;
