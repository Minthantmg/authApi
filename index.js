const express = require('express')
const app = express()
const mongoose = require('mongoose');
const User = require("./models/user");
app.use(express.json())

app.listen(8000,() => {
    console.log("Server is running on port 8000")
})

app.get('/',(req,res) =>{
    res.send('Hello form node Api')
})

app.get('/user',async (req,res) =>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

app.get('/user/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const userById = await User.findById(id)
        res.status(200).json(userById)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

app.post('/register',async (req,res) =>{
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

app.put('/user/:id',async (req,res) => {
    try{
        const {id} = req.params
        const updateUser = await User.findByIdAndUpdate(id,req.body)

        if (!updateUser){
            res.status(404).json({message: "User not found"})
        }
        const updatedUser = await User.findById(id)

        res.status(200).json(updatedUser)

    }catch (error){
        res.status(500).json({message: error.message})
    }
})
mongoose.connect('mongodb+srv://minthant180:09420059474mm@loginapi.mlckn.mongodb.net/LoginApi?retryWrites=true&w=majority&appName=LoginApi')
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Connection Failed'))

