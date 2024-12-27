import { Button, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<>
    {/* <Box minH={"100vh"}></Box>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes> */}
			<Button colorScheme="teal">Clique Aqui</Button>
		</>
	);
}

export default App;
