import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css"; // Reutilizando o mesmo arquivo CSS do Login
import { useToast } from "@chakra-ui/react";

function Signup() {
	  const toast = useToast();

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name || !email || !password) {
			toast({
				title: "Please fill in all fields.",
				status: "error",
				duration: 1500,
				isClosable: false,
			});
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:5000/api/signup",
				{
					name,
					email,
					password,
				}
			);

			if (response.status === 201) {
				toast({
					title: "Account created.",
					description: "We've created your account for you.",
					status: "success",
					duration: 1500,
					isClosable: true,
				});
				console.log(response.data);

				navigate("/login");
			} else{ 
				toast({
					title: "Something went wrong.",
					description: "Please try again later.",
					status: "error",
					duration: 1500,
					isClosable: false,
				});
			}
		} catch (err) {

			switch (err.response.data.error) {
				case "Email already exists":
					toast({
						title: "Email already exists.",
						description: "Please try with a different email.",
						status: "error",
						duration: 1500,
						isClosable: false,
					});
					break;
				case "A valid email is required":
					toast({
						title: "A valid email is required.",
						status: "error",
						duration: 1500,
						isClosable: false,
					});
					break;
				case "A valid name is required":
					toast({
						title: "A valid name is required.",
						status: "error",
						duration: 1500,
						isClosable: false,
					});
					break;
				case "Password must be at least 6 characters long":
					toast({
						title: "Password must be at least 6 characters long.",
						status: "error",
						duration: 1500,
						isClosable: false,
					});
					break;
				default:
					console.log(err.response.data);
					toast({
						title: "Something went wrong.",
						description: "Please try again later.",
						status: "error",
						duration: 1500,
						isClosable: false,
					});
			}
		
		}
	};

	return (
		<div className="container">
			<div className="login-box">
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							placeholder="Enter Name"
							autoComplete="off"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							placeholder="Enter Email"
							autoComplete="off"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							placeholder="Enter Password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
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

