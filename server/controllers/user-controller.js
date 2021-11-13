const {collection,taskCollection,subTask} = require('../config/mongodb');
const {v4:uuid}= require("uuid");

const hashPassword  = require("../utils/hash-password");
const generateToken = require("../utils/generate-token");
const matchPassword = require("../utils/match-password");
const {json} = require("express");

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


const login = async (req,res) =>{
    const {email,password} = req.body;
    let userExists;
    try {
        userExists = await collection.findOne({email:email})
    }
    catch (e) {
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }
    if(userExists === null){
        return res.status(422).json( {message: "Invalid credentials!", status: "NOK"});
    }
    const passwordIsCorrect = await matchPassword(password,userExists.password);
    if(!passwordIsCorrect){
        return res.status(422).json( {message: "Invalid credentials!", status: "NOK"});
    }
    const ONE_DAY = 60*60*24;
    const token = generateToken({uuid:userExists.uuid},ONE_DAY);

    return res.status(200).json({token:token});
}



const updateUserData = async (req,res) => {
    const {name,surname} = req.body
    let data;
    try{
        data = await collection.findOne({uuid:req.userData.uuid});
    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }
    if(data === null){
        return res.status(400).json({message: "Something went wrong!!", status: "NOK"});
    }
    const result = await collection.updateOne({ uuid: req.userData.uuid }, { $set: { name: name,surname:surname } });

    return res.status(200).json({message:"Successfully inserted",status:"OK"});
}


const createTask = async (req,res) =>{
   const {title,description,due_date} = req.body;


//    const date = new Date('05 October 2011 14:48 UTC');
// const test = date.toISOString();

   let user_data;
   try{
       user_data = await collection.findOne({uuid:req.userData.uuid});
       await taskCollection.insertOne({title,description,due_date,completed:0,state:3,user_id:user_data._id})
   }
   catch (e){
       return res.status(400).json({message: "Something went wrong!", status: "NOK"});
   }

   return res.status(200).json({message:"Successfully inserted",status:"OK"})

}


module.exports = {
    register,
    login,
    updateUserData,
    createTask
}
