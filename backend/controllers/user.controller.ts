import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../models/user.model.ts";
import validator from "validator";

// Função de login
export const login = async (req: Request, res: Response): Promise<any> => {
	try {
		const { email, password } = req.body;

		// Validações básicas
		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		// Procura pelo usuário no banco de dados
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Verifica a senha
		if (user.password !== password) {
			return res.status(401).json({ error: "Incorrect password" });
		}

		// Login bem-sucedido
		return res.status(200).json({ message: "Login successful" });
	} catch (error) {
		console.error("Error during login:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

// Função de registro
export const register = async (req: Request, res: Response): Promise<any> => {
	try {
		const { email, name, ...userData } = req.body;

		//Validações básicas
		const nameRegex = /^[a-zA-Z0-9_.-]+$/;
		if (!nameRegex.test(name)) {
			return res.status(400).json({ error: "A valid name is required" });
		}

		// Validações de e-mail
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailRegex.test(email)) {
			return res.status(400).json({ error: "A valid email is required" });
		}

		// Verifica se o e-mail já existe
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "Email already exists" });
		}

		// Cria o novo usuário
		const newUser = await UserModel.create({ email, ...userData });
		return res.status(201).json({ message: "User registered successfully", user: newUser });
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
