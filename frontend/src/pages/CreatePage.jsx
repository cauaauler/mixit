// import React from 'react'
import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { useMediaStore } from "../store/media.js";

function CreatePage() {
	const [media, setMedia] = useState([
		{
			name: "",
			description: "",
			image: "",
			type: "",
			releaseDate: "",
			rating: "",
		},
	]);

  const {createMedia} = useMediaStore();
	const handleCreateMedia = async() => {
    const {sucess, message} = await createMedia(media);
    console.log(sucess, message);
  };

  const {getMedia} = useMediaStore();
  const handleGetMedia = async() => {
    const {success, data} = await getMedia();
    console.log(success, data);
  };

	return (
		<Container>
			<Box textAlign="center" py={10}>
				<Heading>Bem-vindo à Create Page!</Heading>
			</Box>
			<Input placeholder="Name" name="name" onChange={(e) => setMedia({ ...media, name: e.target.value })} />
			<Input placeholder="Description" name="description" onChange={(e) => setMedia({ ...media, description: e.target.value })} />
			<Input placeholder="Image" name="image" onChange={(e) => setMedia({ ...media, image: e.target.value })} />
			<Input placeholder="Type" name="type" onChange={(e) => setMedia({ ...media, type: e.target.value })} />
			<Input placeholder="Release Date" name="releaseDate" onChange={(e) => setMedia({ ...media, releaseDate: e.target.value })} />
			<Button colorScheme="teal" onClick={handleCreateMedia}></Button>
			<Button colorScheme="teal" onClick={handleGetMedia}></Button>
		</Container>
	);
}

export default CreatePage;
