import { create } from "zustand";

type Media = {
	idAniList: string;
	name: string;
	description: string;
	image: string;
	type: string;
	releaseDate: string;
	rating: string;
};

type MediaStore = {
	media: Media[];
	setMedia: (media: Media[]) => void;
	createMedia: (newMedia: Media) => Promise<{ success: boolean; message: string }>;
	getMedia: () => Promise<{ success: boolean; data: Media[]; message: string }>;
	getMediaById: (id: string) => Promise<{ success: boolean; data: Media | null; message: string }>;
	updateMedia: (id: string, updatedMedia: Media) => Promise<{ success: boolean; message: string }>;
	deleteMedia: (id: string) => Promise<{ success: boolean; message: string }>;
};

export const useMediaStore = create<MediaStore>((set) => ({
	media: [],
	setMedia: (media) => set({ media }),
	createMedia: async (newMedia) => {
		if (!newMedia.name) {
			return { success: false, message: "Name and type are required" };
		}
		const res = await fetch("/api/media", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newMedia),
		});
		const data = await res.json();
		set((state) => ({ media: [...state.media, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	getMedia: async () => {
		try {
			const res = await fetch("/api/media", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();

			return { success: true, data: data.data || [], message: "Media fetched successfully" };
		} catch (error) {
			console.error("Error fetching media:", error);
			return { success: false, data: [], message: "Failed to fetch media" }; // data será sempre um array
		}
	},

	getMediaById: async (id) => {
		const res = await fetch(`/api/media/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		return { success: true, data: data.data, message: "Media fetched successfully" };
	},
	updateMedia: async (id, updatedMedia) => {
		const res = await fetch(`/api/media/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedMedia),
		});
		const data = await res.json();
		return { success: true, message: "Media updated successfully" };
	},
	deleteMedia: async (id) => {
		const res = await fetch(`/api/media/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		return { success: true, message: "Media deleted successfully" };
	},
}));
