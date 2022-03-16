import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected Successful!'));

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Must have a name"]
    },
    type:{
        type: String,
        default: "user"
    },
    email:{
        type: String,
        required:[true, "Must have email"]
    },
    password:{
        type: String,
        required: [true]
    }
});

const User = new mongoose.model("User", userSchema);

// const testUser = new User({
//     name: "admin",
//     email: "admin@gmail.com",
//     password: "password"
// });

// testUser.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log("Error: ",err);
// })

//Routes
app.post("/login", async(req, res) => {
    const {email, password} = req.body;
    await User.findOne({email: email}, (err, user) => {
        if(user){
            if(password === user.password){
 
                res.send({message: "Login Successfull", user: user});
            }else{
                res.send({message: "Password not Valid!"})
            }
        }else{
            res.send({message: "User not registered"});
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});