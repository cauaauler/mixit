import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<BrowserRouter>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</BrowserRouter>
		</StrictMode>
	);
} else {
	console.error("Root element not found");
}
