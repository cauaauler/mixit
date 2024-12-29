import { Box, Heading, Spinner, Alert, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function Loading() {
	return (
		<Box textAlign="center" py={10}>
			<Spinner size="xl" />
		</Box>
	);
}

function DataList({ data }) {
	return (
		<ul>
			{data.map((item) => (
				<li key={item.id}>{item.name}</li>
			))}
		</ul>
	);
}

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState(""); // Nome a ser pesquisado

	const fetchData = async (searchQuery) => {
		setLoading(true);
		setError(null);

		const url = process.env.REACT_APP_API_URL || "https://graphql.anilist.co";
		const query = `
      query ($search: String) {
        Media(type: ANIME, sort: POPULARITY_DESC, search: $search) {
          id
          title {
            romaji
            english
            native
          }
        }
      }
    `;

		try {
			console.log("Buscando dados para:", searchQuery); // Log para depuração
			const response = await axios.post(url, {
				query,
				variables: { search: searchQuery },
			});
			const fetchedData = response.data.data.Media.map((media) => ({
				id: media.id,
				name: media.title.romaji || media.title.english || media.title.native,
			}));

			// Limitar a 5 resultados
			setData(fetchedData.slice(0, 5)); // Limita os resultados para no máximo 5
		} catch (err) {
			console.error("Erro ao buscar dados:", err);
			setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = () => {
		if (search.trim()) {
			fetchData(search);
		} else {
			setData([]);
			setError(null);
		}
	};

	return (
		<div>
			<Box textAlign="center" py={10}>
				<Heading>Bem-vindo à Home Page!</Heading>
				<Input placeholder="Digite o nome do anime" value={search} onChange={(e) => setSearch(e.target.value)} mt={4} width="300px" />
				<Button onClick={handleSearch} colorScheme="blue" mt={4}>
					Pesquisar
				</Button>
			</Box>

			{loading && <Loading />}

			{error && (
				<Box textAlign="center" py={10}>
					<Alert status="error">{error}</Alert>
				</Box>
			)}

			{!loading && !error && data.length > 0 && (
				<Box textAlign="center" py={10}>
					<h1>Resultados da Pesquisa</h1>
					<DataList data={data} />
				</Box>
			)}

			{!loading && !error && data.length === 0 && search.trim() && (
				<Box textAlign="center" py={10}>
					<Alert status="info">Nenhum resultado encontrado.</Alert>
				</Box>
			)}
		</div>
	);
}

export default App;
