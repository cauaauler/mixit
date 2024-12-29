import { Button, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import {useMediaStore} from "./store/media.js";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";


function App() {
	const { media } = useMediaStore();

	return (
		<>
			<Box minH={"100vh"}>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/create" element={<CreatePage />} />
				</Routes>
				<Button colorScheme="teal">Clique Aqui</Button>
			</Box>
		</>
	);
}

export default App;
