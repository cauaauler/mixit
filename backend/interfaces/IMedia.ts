export interface IMedia {
	id?: string; // O ID será gerado automaticamente pelo MongoDB
	name: string;
	description: string;
	image: string;
	type: string;
	releaseDate: string;
	rating?: number;
}
