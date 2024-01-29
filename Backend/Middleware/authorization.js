
const jwt = require('jsonwebtoken')

require('dotenv').config()

const authorization = (req,res,next)=> {
  if(!req.headers.authorization){
      return res.send({msg: "Please Login"});
  }
  const token = req.headers.authorization.split(" ")[1]
  jwt.verify(token, process.env.JWT_SECRET, function(err,decoded){
      if(err){
          res.send({msg: "Please login"})
      }
      else{
          req.body.userId = decoded.userId
          next();
      }
      return res.send({ message: "Not Authorized" });
  })
}

module.exports = {authorization}