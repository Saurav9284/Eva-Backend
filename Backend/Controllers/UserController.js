const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {UserModel} = require('../Models/User')
require('dotenv').config()

const UserController = express.Router();

UserController.post('/signup', async (req,res) => {

  const {name , email , password ,phone_number, vehicle_type } = req.body
 
  if(!(name,email,password,phone_number,vehicle_type)){
    return res.send({message:'Please fill all the details'})
  }
  try {
    const EmailinUse = await UserModel.findOne({ email });
  
      if (EmailinUse) {
        return res.send({
          message: "User already exists. Please login!",
        });
      }
    bcrypt.hash(password, 5, async function(err, hash) {
      try {
        const user = await UserModel.create({
          name: name,
          email: email,
          password: hash,
          phone_number: phone_number,
          vehicle_type: vehicle_type
        })
        console.log(user)
        res.send({ message:'User Created'})
      } catch (error) {
        res.send({ message:'Something went Wrong'})
        console.log(error)
      }
  });
  } catch (error) {
     res.send({ message:'Something went worng'})
     console.log(error)
  }
});



UserController.post('/login', async (req,res)=>{
  const {email , password} = req.body

  if(!(email,password)){
    return res.send({ message:'Please fill all the details'})
  }
  try {
     const user = await UserModel.findOne({email})
     if(!user){
      res.send({ message:'Worng Credentials'})
     }
     
     bcrypt.compare(password, user.password, function(err, result) {
        if(result){
          const token = jwt.sign({ phone_number: user.phone_number, userId: user._id },process.env.JWT_SECRET);
          return res.send({
          message: "login succcessful",
          userData: {
            token: token,
            name: user.name,
            phone_number: user.phone_number,
          },
        });

      } else {
        return res.send({message: "Wrong credentials!"});
      }
  });
    
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error)
  }
})

module.exports = {UserController}