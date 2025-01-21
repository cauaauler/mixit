interface Media {
	id?: string;
	name: string;
}

interface MediaStore {
	media: Media[];
	setMedia: (media: Media[]) => void;
	createMedia: (newMedia: Media) => Promise<{ success: boolean; message: string }>;
	getMedia: () => Promise<{ success: boolean; data?: Media[]; message: string }>;
	getMediaById: (id: string) => Promise<{ success: boolean; data?: Media; message: string }>;
	updateMedia: (id: string, updatedMedia: Media) => Promise<{ success: boolean; data?: Media; message: string }>;
	deleteMedia: (id: string) => Promise<{ success: boolean; message: string }>;
}
