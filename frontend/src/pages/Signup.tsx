import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css"; // Reutilizando o mesmo arquivo CSS do Login

function Signup() {
	const [name, setName] = useState<String>("");
	const [email, setEmail] = useState<String>("");
	const [password, setPassword] = useState<String>("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !email || !password) {
			alert("Please fill in all fields.");
			return;
		}
		axios
			.post("http://localhost:5000/api/register", {
            "name": name,
            "email": email,
            "password": password })
			.then((result) => {
				console.log(result);
				navigate("/login");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="container">
			<div className="login-box">
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" placeholder="Enter Name" autoComplete="off" name="name" onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="text" placeholder="Enter Email" autoComplete="off" name="email" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password" placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<button type="submit" className="btn">
						Sign Up
					</button>
				</form>
				<p>Already have an account?</p>
				<Link to="/login" className="link">
					Login
				</Link>
			</div>
		</div>
	);
}

export default Signup;
