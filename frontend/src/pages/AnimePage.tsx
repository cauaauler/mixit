import { Box, Heading, Spinner, Alert, Input, Button, HStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMediaStore } from "../store/media.ts";
import { jwtDecode } from "jwt-decode";

const urlAnime = "https://anilist.co/anime/";

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
		<ul
			style={{
				listStyleType: "none",
				padding: "0",
				margin: "0",
			}}
		>
			{data.map((item) => (
				<li
					key={item.id}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginBottom: "16px",
						gap: "1em",
					}}
				>
					<img src={item.coverImage} alt="" style={{ width: "150px", height: "225px" }} />
					<a href={urlAnime + item.id} target="_blank" rel="noreferrer">
						{item.name}
					</a>
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

function AnimePage() {
	const [data, setData] = useState<{ id: number; name: string; coverImage: string }[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [hasResults, setHasResults] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const resultsPerPage = 10;
	const { createMedia } = useMediaStore();

	const navigate = useNavigate();

	// import { useEffect } from "react";
	// import { useNavigate } from "react-router-dom";
	// import axios from "axios";

	// const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("userToken");

		if (!token) {
			navigate("/login");
			return; // Evita execução desnecessária
		}

		const fetchAuth = async () => {
			try {
				//aqui não tem verificação, mas funciona
				console.log(token);
				const decoded = jwtDecode(token); // Usa jwtDecode no lugar de jwt.verify
				console.log(decoded);
			} catch (error) {
				console.error("Erro na autenticação:", error);
				navigate("/login");
			}
		};

		fetchAuth();

		// Opcional: Retorno para evitar memory leak
		return () => {
			// Cancelamento de requisição poderia ser adicionado aqui, se necessário
		};
	}, [navigate]);

	// return null; // Componente sem renderização
	// };

	// export default AuthCheck;

	const addMedia = async (media) => {
		const { success, message } = await createMedia(media);
		console.log(success, message);
	};

	const fetchData = async (searchQuery: string, pageNumber: number) => {
		if (loading) return; // Evita múltiplas requisições simultâneas
		setLoading(true);
		setError(null);

		const url = "https://graphql.anilist.co";
		const query = `
      query ($search: String, $page: Int) {
        Page(page: $page, perPage: ${resultsPerPage}) {
          media(
            sort: POPULARITY_DESC,
            search: $search,
            isAdult: false
          ) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
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
				<Heading>Bem-vindo à Página de Animes!</Heading>
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

export default AnimePage;
