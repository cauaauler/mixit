import mongoose from "mongoose";
import UserModel from "../models/user.model.js";

export const login = ((req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("No record existed")
            }
        })
})

export const register = (req, res) => {
    const { email, ...userData } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: "A valid email is required" });
    }

    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: "Email already exists" });
            }
            else {
                // Cria o usuário apenas se o e-mail não existir
                return UserModel.create({ email, ...userData });
            }

        })
        .catch(err => {
            console.error(err); // Log detalhado para depuração
            res.status(500).json({ error: "Internal server error" }); // Resposta simplificada
        });
};
