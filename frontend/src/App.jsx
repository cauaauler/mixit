import { Button, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import {useMediaStore} from "./store/media.js";

import Navbar from "./components/Navbar";

import AnimePage from "./pages/AnimePage";
import CreatePage from "./pages/CreatePage";
import Signup from "./pages/Signup";


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
				</Routes>
				<Button colorScheme="teal">Clique Aqui</Button>
			</Box>
		</>
	);
}

export default App;
