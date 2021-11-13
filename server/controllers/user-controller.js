const {collection} = require('../config/mongodb');
const {v4:uuid}= require("uuid");

const hashPassword  = require("../utils/hash-password");
const generateToken = require("../utils/generate-token");

const register = async (req,res)=> {
   const {name,surname,email,password} = req.body;
   const data = await collection.findOne({
        email: email,
    });
   if(data !== null){
       return res.status(422).json({message:"Email already exists",status:"NOK"})
   }
   else{
   const uniqueId = uuid();
   const hashedPassword =await hashPassword(password);
   let result;
   try{
       result = await collection.insertOne({
           name:name,
           surname:surname,
           email:email,
           password:hashedPassword,
           uuid:uniqueId
       })

   }
   catch (e){
       return res.status(400).json({message:"Something went wrong",status:"NOK"})
   }

   }


  return res.status(200).json({message:"User registered successfully",status:"OK"});

}





module.exports = {
    register
}
