const jwt = require("jsonwebtoken");

// Middleware de autenticação
const authenticate = (req, res, next) => {
	// Obtém o token do cabeçalho Authorization
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Access denied. No token provided." });
	}

	const token = authHeader.split(" ")[1]; // Remove "Bearer" do token

	try {
		// Verifica e decodifica o token
		const decoded = jwt.verify(token, "SECRET_KEY"); // Substitua "SECRET_KEY" pela sua chave secreta

		// Adiciona os dados do token decodificado no objeto req
		req.user = decoded;

		// Passa o controle para o próximo middleware ou rota
		next();
	} catch (err) {
		return res.status(400).json({ message: "Invalid token." });
	}
};
