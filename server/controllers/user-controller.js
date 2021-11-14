const {collection,taskCollection,subTask,listCollection} = require('../config/mongodb');
const {ObjectID} = require("mongodb");
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
   const {title,description,due_date,list_id} = req.body;


//    const date = new Date('05 October 2011 14:48 UTC');
// const test = date.toISOString();

   let user_data;
   try{
       user_data = await collection.findOne({uuid:req.userData.uuid});
       const task_data = await taskCollection.insertOne({title,description,due_date,completed:0,state:3,user_id:user_data._id});
       if(list_id !== null && list_id !== '' && list_id !== undefined){
       const list_data = await listCollection.findOne({_id: new ObjectID(list_id)});
       await  listCollection.insertOne({name:list_data.name,description: list_data.description,task_id:task_data.insertedId,state:3});
       }
   }
   catch (e){
       return res.status(400).json({message: "Something went wrong!", status: "NOK"});
   }

   return res.status(200).json({message:"Successfully inserted",status:"OK"})

}

const editTask = async (req,res)=>{
    const {task_id,title,description,due_date,list_id}= req.body
    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });
        const task_data = await taskCollection.findOne({_id: new ObjectID(task_id),user_id:user_data._id});
        if(task_data === null) {
            return res.status(422).json({message: "Invalid task_id!", status: "NOK"});
        }

        await taskCollection.updateOne({ "_id": new ObjectID(task_id) }, { $set: { "title":title,"description":description,"due_date":due_date } });



     const list_data = await listCollection.findOne({_id:new ObjectID(list_id),task_id : new ObjectID(task_id),state:3});

     if(list_data === null){
         const set_state_other =  await listCollection.findOne({task_id : new ObjectID(task_id),state:3});
         if(set_state_other !== null) {
             await listCollection.updateOne({task_id : new ObjectID(task_id)},{$set:{state:5}});
         }

         const existed_list = await listCollection.findOne({_id: new ObjectID(list_id),user_id: new ObjectID(user_data._id)});
         await listCollection.insertOne({name:existed_list.name,description:existed_list.description,task_id:new ObjectID(task_id),state:3});

     }

    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }
 return res.status(200).json({message:"Successfully inserted",status:"OK"})
}


const completeTask = async (req,res)=>{

    const {task_id,completed}= req.body
    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });
        const task_data = await taskCollection.findOne({_id: new ObjectID(task_id),user_id:user_data._id});
        if(task_data === null) {
            return res.status(422).json({message: "Invalid task_id!", status: "NOK"});
        }
        await taskCollection.updateOne({_id: new ObjectID(task_id)},{$set:{completed:completed}});
    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }
    return res.status(200).json({message:"Successfully inserted",status:"OK"})
}


const deleteTask = async (req,res)=>{
    const {task_id}= req.body
    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });
        const task_data = await taskCollection.findOne({_id: new ObjectID(task_id),user_id:user_data._id});
        if(task_data === null) {
            return res.status(422).json({message: "Invalid task_id!", status: "NOK"});
        }
        await taskCollection.updateOne({_id: new ObjectID(task_id)},{$set:{state:5}});
    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }
    return res.status(200).json({message:"Successfully inserted",status:"OK"})
}


const createSubTask =async (req,res)=>{
    const {title,description,due_date,task_id} = req.body;

    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });
        const task_data = await taskCollection.findOne({_id: new ObjectID(task_id),user_id:user_data._id});
        if(task_data === null) {
            return res.status(422).json({message: "Invalid task_id!", status: "NOK"});
        }
        await subTask.insertOne({title,description,due_date,completed:0,state:3,task_id: new ObjectID(task_id)});

    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }

    return res.status(200).json({message:"Successfully inserted",status:"OK"})
}

const createList = async (req,res)=>{
   const {name,description} = req.body;
   try {
       const user_data =await collection.findOne({ uuid: req.userData.uuid });
       await listCollection.insertOne({name,description,user_id:user_data._id,state:3});
   }
   catch (e){
       return res.status(400).json({message: "Something went wrong!", status: "NOK"});
   }
    return res.status(200).json({message:"Successfully inserted",status:"OK"});
}


const editList = async (req,res)=>{
    const {list_id,name,description} = req.body;
    try {
        const user_data =await collection.findOne({ uuid: req.userData.uuid });
        const check_list = await listCollection.findOne({_id:new ObjectID(list_id),user_id:user_data._id});
        if(check_list === null){
            return res.status(422).json({message: "Invalid list_id!", status: "NOK"});
        }
        await listCollection.updateOne({_id: new ObjectID(list_id)},{$set:{name,description}});
    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }
    return res.status(200).json({message:"Successfully inserted",status:"OK"});
}


const deleteList = async (req,res)=>{
    const {list_id}= req.body
    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });
        const list_data = await listCollection.findOne({_id: new ObjectID(list_id),user_id:user_data._id});
        if(list_data === null) {
            return res.status(422).json({message: "Invalid list_id!", status: "NOK"});
        }
        await listCollection.updateOne({_id: new ObjectID(list_id)},{$set:{state:5}});
    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }
    return res.status(200).json({message:"Successfully inserted",status:"OK"})
}

const getUserData = async (req,res) =>{
    let user_data;
    try{
        user_data = await collection.findOne({uuid:req.userData.uuid});
    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }

    return res.status(200).json({name:user_data.name,surname: user_data.surname,email:user_data.email});

}


const getSubtasks = async (req,res)=>{
    const{task_id} = req.body;
    let data;
    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });
        const task_data = await taskCollection.findOne({_id: new ObjectID(task_id),user_id:user_data._id});
        if(task_data === null) {
            return res.status(422).json({message: "Invalid task_id!", status: "NOK"});
        }
         data = await subTask.find( { task_id : new ObjectID(task_id)}).toArray();

    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }

    return res.status(200).json(data);
}


const getTasks = async (req,res)=>{

    let data;
    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });

        data = await taskCollection.find( { user_id : user_data._id}).sort( { _id: -1 } ).toArray();

    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }

    return res.status(200).json(data);
}

const getLists = async (req,res)=>{

    let data;
    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });

        data = await listCollection.find( { user_id : user_data._id}).sort( { _id: -1 } ).toArray();

    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }

    return res.status(200).json(data);
}

const getTasksId = async (req,res)=>{

    const {id}= req.params
    let task_data;
    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });
         task_data = await taskCollection.findOne({_id: new ObjectID(id),user_id:user_data._id});
        if(task_data === null) {
            return res.status(422).json({message: "Invalid task_id!", status: "NOK"});
        }

    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }
    return res.status(200).json(task_data)
}


const getListId = async (req,res)=>{

    const {id}= req.params
    let list_data;
    try{
        const user_data =await collection.findOne({ uuid: req.userData.uuid });
         list_data = await listCollection.findOne({_id: new ObjectID(id),user_id:user_data._id});
        if(list_data === null) {
            return res.status(422).json({message: "Invalid list_id!", status: "NOK"});
        }

    }
    catch (e){
        return res.status(400).json({message: "Something went wrong!", status: "NOK"});
    }
    return res.status(200).json(list_data)
}


module.exports = {
    register,
    login,
    updateUserData,
    createTask,
    editTask,
    completeTask,
    deleteTask,
    createSubTask,
    createList,
    editList,
    deleteList,
    getUserData,
    getSubtasks,
    getTasks,
    getLists,
    getTasksId,
    getListId

}
