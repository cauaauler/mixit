import { Box, Heading, Spinner, Alert, Input, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useMediaStore } from "../store/media.js";


function Loading() {
	return (
		<Box textAlign="center" py={10}>
			<Spinner size="xl" />
		</Box>
	);
}

function DataList({ data, onCreateMedia }) {
	return (
		<ul>
			{data.map((item) => (
				<li
					key={item.id}
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "8px",
					}}
				>
					<span>{item.name}</span>
					<Button
						colorScheme="teal"
						size="sm"
						onClick={() =>
							onCreateMedia({
								idAniList: item.id,
								name: item.name,
							})
						}
					>
						Salvar
					</Button>
				</li>
			))}
		</ul>
	);
}

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [hasResults, setHasResults] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const resultsPerPage = 10;
	const {createMedia} = useMediaStore();
	const addMedia = async (media) => {

			const { sucess, message } = await createMedia(media);
			console.log(sucess, message);
	};

	const fetchData = async (searchQuery, pageNumber) => {
		setLoading(true);
		setError(null);

		const url = "https://graphql.anilist.co";
		const query = `
      query ($search: String, $page: Int) {
        Page(page: $page, perPage: ${resultsPerPage}) {
          media(type: ANIME, sort: POPULARITY_DESC, search: $search) {
            id
            title {
              romaji
              english
              native
            }
          }
        }
      }
    `;

		try {
			const response = await axios.post(url, {
				query,
				variables: { search: searchQuery, page: pageNumber },
			});

			const fetchedData = response.data.data.Page.media.map((media) => ({
				id: media.id,
				name: media.title.romaji || media.title.english || media.title.native,
			}));

			setData(fetchedData);
			setHasMore(fetchedData.length === resultsPerPage);
		} catch (err) {
			console.error("Erro ao buscar dados:", err);
			setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = () => {
		const trimmedSearch = search.trim();
		if (trimmedSearch) {
			setPage(1);
			fetchData(trimmedSearch, 1);
			setHasResults(true);
		} else {
			setData([]);
			setError(null);
			setHasMore(false);
			setHasResults(false);
		}
	};

	const handleNextPage = () => {
		if (hasMore) {
			const nextPage = page + 1;
			setPage(nextPage);
			fetchData(search, nextPage);
		}
	};

	const handlePreviousPage = () => {
		if (page > 1) {
			const previousPage = page - 1;
			setPage(previousPage);
			fetchData(search, previousPage);
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
					<Heading size="md" mb={4}>
						Resultados da Pesquisa
					</Heading>
					<DataList data={data} onCreateMedia={addMedia} />
					<HStack justify="center" mt={4}>
						<Button onClick={handlePreviousPage} disabled={page === 1}>
							Página Anterior
						</Button>
						<Button onClick={handleNextPage} disabled={!hasMore}>
							Próxima Página
						</Button>
					</HStack>
				</Box>
			)}

			{hasResults && !loading && !error && data.length === 0 && (
				<Box textAlign="center" py={10}>
					<Alert status="info">Nenhum resultado encontrado.</Alert>
				</Box>
			)}
		</div>
	);
}

export default App;
