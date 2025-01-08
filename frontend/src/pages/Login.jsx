import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css"; // Importa o arquivo CSS personalizado

function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) {
			alert("Please fill in both email and password.");
			return;
		}
		axios
			.post("http://localhost:5000/api/login", {
			 "email": email,
			 "password": password })
			.then((result) => {
				console.log(result);
				if (result.data === "Success") {
					navigate("/home");
				} else {
					navigate("/signup");
					alert("You are not registered to this service");
				}
			})
			.catch((err) => console.log(err));
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
