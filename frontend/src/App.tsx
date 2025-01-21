import React from "react";

import { Button, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import {useMediaStore} from "./store/media.ts";

import Navbar from "./components/Navbar.tsx";

import AnimePage from "./pages/AnimePage.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";


function App() {
	const { media } = useMediaStore();

	return (
		<>
			<Box minH={"100vh"}>
				<Navbar />
				<Routes>
					<Route path="/" element={<AnimePage />} />
					<Route path="/create" element={<CreatePage />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
				</Routes>
				<Button colorScheme="teal">Clique Aqui</Button>
			</Box>
		</>
	);
}

export default App;
