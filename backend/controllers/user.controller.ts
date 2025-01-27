import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../models/user.model.ts";
import validator from "validator";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");



export const register = async (req: Request, res: Response): Promise<any> => {
	try {
		const { email, name, password, ...userData } = req.body;

		// Validação de senha
		if (!password || password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		// Validação do nome
		const nameRegex = /^[a-zA-Zà-úÀ-Ú\s0-9'-]+$/;
		if (!name || !nameRegex.test(name)) {
			return res.status(400).json({ error: "A valid name is required (letters, spaces, '-' and ' only)" });
		}

		// Validação do e-mail
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailRegex.test(email)) {
			return res.status(400).json({ error: "A valid email is required" });
		}

		// Verifica se o e-mail já existe
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "Email already exists" });
		}

		// Criptografa a senha
		const hashedPassword = await bcrypt.hash(password, 10); // 10 é o "salt rounds", pode ajustar conforme necessário

		// Cria o novo usuário com a senha criptografada
		const newUser = await UserModel.create({ email, name, password: hashedPassword, ...userData });
		return res.status(201).json({ message: "User registered successfully", user: newUser });
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

// Função de registro
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

		// Verifica a senha usando bcrypt
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Incorrect password" });
		}
		
		// Gera o token JWT
		const token = jwt.sign({ userId: user.id, email: user.email }, "SECRET_KEY", {
			expiresIn: "1h", // Token expira em 1 hora
		});

		res.json({ token });

		// Login bem-sucedido
		return res.status(200).json({ message: "Login successful" });
	} catch (error) {
		console.error("Error during login:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

