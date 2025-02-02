import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email || !password) {
			alert("Please fill in both email and password.");
			return;
		}

		axios
			.post("http://localhost:5000/api/login", {
				email,
				password,
			})
			.then((result) => {
				if (result.status === 200) {
					// Armazena o token JWT no localStorage
					// console.log("Token:", result.data.token);
					const expiresIn = new Date().getTime() + 3600000; // 1 hora
					localStorage.setItem("userToken", JSON.stringify({ token: result.data.token, expires: expiresIn }));
					navigate("/");
				} else {
					alert("You are not registered for this service.");
				}
			})
			.catch((err) => {
				console.error(err);
				alert("Login failed. Please try again.");
			});
	};

	return (
		<div className="container">
			<div className="login-box">
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="text" placeholder="Enter Email" autoComplete="off" name="email" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password" placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<button type="submit" className="btn">
						Login
					</button>
				</form>
				<p>Don't have an account?</p>
				<Link to="/signup" className="link">
					Sign Up
				</Link>
			</div>
		</div>
	);
}

export default Login;
