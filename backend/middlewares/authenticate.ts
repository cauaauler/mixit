import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(401).json({ message: "Access denied. No token provided." });
		return; // Certifique-se de encerrar a execução
	}

	const token = authHeader.split(" ")[1]; // Remove "Bearer" do token

	try {
		// Verifica e decodifica o token
		const decoded = jwt.verify(token, "1321sadasd341dsavaasddw"); // Substitua "1321sadasd341dsavaasddw" pela sua chave secreta

		// console.log("Token recebido:", token);
		// Adiciona os dados do token decodificado no objeto req
		(req as any).user = decoded;

		// console.log("Token decodificado:", decoded);
		// Passa o controle para o próximo middleware ou rota
		next();
	} catch (error) {
		res.status(401).json({ message: "Authentication failed." });
		return; // Certifique-se de encerrar a execução
	}
};
