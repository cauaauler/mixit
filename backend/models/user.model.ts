import mongoose from "mongoose";

const User = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	password: { type: String, required: true }, // A senha criptografada será armazenada aqui
});

const UserModel = mongoose.model("users", User)

export default UserModel;