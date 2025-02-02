import { Box, Heading, Spinner, Alert, Input, Button, HStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMediaStore } from "../store/media.ts";
import { jwtDecode } from "jwt-decode";

const urlAnime = "https://anilist.co/anime/";
const resultsPerPage = 50;

function Loading() {
	return (
		<Box textAlign="center" py={10}>
			<Spinner size="xl" />
		</Box>
	);
}

function DataList({ data, onCreateMedia }) {
	if (!data || data.length === 0) return null;

	return (


		<ul style={{  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px",  justifyItems: "center",  listStyleType: "none", padding: "0", marginLeft: "10px", marginRight: "10px" }}>
			{data.map((item) => (
				<li key={item.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px", gap: "1em" }}>
					<img src={item.coverImage} alt="" style={{ width: "150px", height: "225px" }} />
					<a href={urlAnime + item.id} target="_blank" rel="noreferrer">
						{item.name}
					</a>
					{/* Fazer este botão funcionar */}
					<Button colorScheme="teal" size="sm" onClick={() => onCreateMedia({ idAniList: item.id, name: item.name })}>
						Salvar
					</Button>
				</li>
			))}
		</ul>
	
	);
}
function AnimePage() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const { createMedia } = useMediaStore();
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("userToken");
		if (!token) {
			navigate("/login");
			return;
		}
		try {
			const parsedToken = JSON.parse(token);
			if (!parsedToken.token || new Date().getTime() >= parsedToken.expires) {
				localStorage.removeItem("userToken");
				navigate("/login");
			}
		} catch {
			localStorage.removeItem("userToken");
			navigate("/login");
		}
	}, [navigate]);

	useEffect(() => {
		fetchData(null, 1); // Busca inicial ao carregar a página
	}, []);

	const fetchData = async (searchQuery, pageNumber) => {
		if (loading) return;
		setLoading(true);
		setError("");

		const url = "https://graphql.anilist.co";
		const query = `
      query ($search: String, $page: Int) {
        Page(page: $page, perPage: ${resultsPerPage}) {
          media(sort: POPULARITY_DESC, search: $search, isAdult: false) {
            id
            title { romaji english native }
            coverImage { large }
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
				coverImage: media.coverImage.large,
			}));

			setData((prevData) => (pageNumber === 1 ? fetchedData : [...prevData, ...fetchedData]));
			setHasMore(fetchedData.length === resultsPerPage);
		} catch (err) {
			console.error("Erro ao buscar dados:", err);
			setError("Erro ao carregar dados. Tente novamente mais tarde.");
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = () => {
		const trimmedSearch = search.trim();
		setPage(1);
		fetchData(trimmedSearch, 1);
	};

	const handleNextPage = () => {
		if (hasMore) {
			setPage((prevPage) => prevPage + 1);
			fetchData(search, page + 1);
		}
	};

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage((prevPage) => prevPage - 1);
			fetchData(search, page - 1);
		}
	};

	const userToken = JSON.parse(localStorage.getItem("userToken") || "{}");
	//mudar para nome depois
	const email = userToken?.token ? (jwtDecode(userToken.token) as any).email : "";

	return (
		<div>
			<Box textAlign="center" py={10}>
				<Heading>Bem-vindo à Página de Animes, {email}!</Heading>
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
					<DataList data={data} onCreateMedia={createMedia} />
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
			{!loading && !error && data.length === 0 && (
				<Box textAlign="center" py={10}>
					<Alert status="info">Nenhum resultado encontrado.</Alert>
				</Box>
			)}
		</div>
	);
}

export default AnimePage;
