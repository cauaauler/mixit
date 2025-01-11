import { create } from 'zustand'
import { deleteMedia, getMedia, getMediaById } from '../../../backend/controllers/media.controller';

export const useMediaStore = create((set) => ({
    media: [],
    setMedia: (media) => set({ media }),
    createMedia: async (newMedia) => {
        if (!newMedia.name ) {
            return ({ sucess: false, message: 'Name and type are required' });
        }
        const res = await fetch("/api/media", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMedia),
        })
        const data = await res.json();
        set((state) => ({ newMedia: [...state.media, data.data] }));
        return ({ sucess: true, message: 'Product created sucessfully' });

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

            return { success: true, data: data.data, message: 'Media fetched successfully' };
        } catch (error) {
            console.error("Error fetching media:", error);
            return { success: false, message: 'Failed to fetch media' };
        }
    },
    getMediaById: async (id) => {
        const res = await fetch(`/api/media/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        return { success: true, data: data.data, message: 'Media fetched successfully' };
    },
    updateMedia: async (id, updatedMedia) => {
        const res = await fetch(`/api/media/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMedia),
        })
        const data = await res.json();
        return { success: true, data: data.data, message: 'Media updated successfully' };
    },
    deleteMedia: async (id) => {
        const res = await fetch(`/api/media/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        return { success: true, data: data.data, message: 'Media deleted successfully' };
            }
}))
