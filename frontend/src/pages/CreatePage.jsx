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
	const handleAddmedia = async() => {
    const {sucess, message} = await createMedia(media);
    console.log(sucess, message);
  };

  const {getMedia} = useMediaStore();
  const handleListmedia = async() => {
    const {sucess, data} = await getMedia();
    console.log(sucess, data);
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
			<Button colorScheme="teal" onClick={handleAddmedia}></Button>
			<Button colorScheme="teal" onClick={handleListmedia}></Button>
		</Container>
	);
}

export default CreatePage;
