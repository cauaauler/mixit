import { JwtPayload } from "jsonwebtoken";

declare global {
	namespace Express {
		interface Request {
			user?: string | JwtPayload; // Adicione a propriedade `user` ao Request
		}
	}
}
