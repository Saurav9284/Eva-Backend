
const express = require('express')
const {PetrolModel} = require('../Models/Petrol')
const PetrolController = express.Router()

PetrolController.get('/',async (req, res) => {
    try {
      const userId = req.user.userId; 
  
      const logs = await PetrolModel.find({ user: userId });
  
      res.send(logs);
    } catch (error) {
      console.error(error);
      res.send({ error: 'Internal Server Error' });
    }
  });


PetrolController.post('/',async (req,res)=>{
    const userId = req.userId
    const {date, odometer_reading, petrol_price, petrol_volume, station } = req.body;
    try {
        if(date, odometer_reading, petrol_price, petrol_volume, station){
            const petrolLog = await PetrolModel.create({
                user: userId,
                date,
                odometer_reading,
                petrol_price,
                petrol_volume,
                station,
              });
            res.send({ message: "Pertolllog added successfully" });
            console.log(petrolLog)
        }
        else{
            res.send({ message:'Please fill all the details!'})
        }
    } catch (error) {
        res.send({ message:'Something went wrong'})
        console.log(error)
    }
});

PetrolController.patch('/edit/:id',async (req,res)=>{
   try {
    const id = req.params.id;
    
    const data = await PetrolModel.findOneAndUpdate({ _id: id },{ ...req.body });
      if(data){
        res.send({ message:'Data Updated Successfully'})
        console.log(data)
      }
      else{
        res.send({ message:" data not found"});
      }
    
   } catch (error) {
     res.send({ message:'Something went wrong'})
     console.log(error)
   }
});


PetrolController.delete('/delete/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        
        const data = await PetrolModel.findOneAndDelete({ _id: id });

        if (data) {
            res.send({ message:'Data Deleted Successfully'})
          } else {
            res.send({ message:" data not found"});
          }
    } catch (error) {
        res.send({ message:'Something went wrong'})
        console.log(error)
    }
});


module.exports = {PetrolController}