import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const UserModel = mongoose.model("users", User)

export default UserModel;