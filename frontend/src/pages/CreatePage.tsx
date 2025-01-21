import { Box, Button, Container, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMediaStore } from "../store/media.ts";

function CreatePage() {
	const [media, setMedia] = useState({
		idAniList: "",
		name: "",
		description: "",
		image: "",
		type: "",
		releaseDate: "",
		rating: "",
	});

	const { createMedia, getMedia } = useMediaStore();

	const handleCreateMedia = async () => {
		const { success, message } = await createMedia(media);
		console.log(success, message);
	};

	const handleGetMedia = async () => {
		const { success, data } = await getMedia();
		console.log(success, data);
	};

	return (
		<Container>
			<Box textAlign="center" py={10}>
				<Heading>Bem-vindo à Create Page!</Heading>
			</Box>
			<Input placeholder="Name" name="name" onChange={(e) => setMedia((prev) => ({ ...prev, name: e.target.value }))} mb={4} />
			<Input placeholder="Description" name="description" onChange={(e) => setMedia((prev) => ({ ...prev, description: e.target.value }))} mb={4} />
			<Input placeholder="Image" name="image" onChange={(e) => setMedia((prev) => ({ ...prev, image: e.target.value }))} mb={4} />
			<Input placeholder="Type" name="type" onChange={(e) => setMedia((prev) => ({ ...prev, type: e.target.value }))} mb={4} />
			<Input placeholder="Release Date" name="releaseDate" onChange={(e) => setMedia((prev) => ({ ...prev, releaseDate: e.target.value }))} mb={4} />
			<Button colorScheme="teal" onClick={handleCreateMedia} mb={4}>
				Criar Mídia
			</Button>
			<Button colorScheme="teal" onClick={handleGetMedia}>
				Obter Mídias
			</Button>
		</Container>
	);
}

export default CreatePage;
