import { create } from 'zustand'

export const useMediaStore = create((set) => ({
    media: [],
    setMedia: (media) => set({ media }),
    createMedia: async (newMedia) => {
        if (!newMedia.name || !newMedia.type) {
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

            return { success: true, data: data.data };
        } catch (error) {
            console.error("Error fetching media:", error);
            return { success: false, message: 'Failed to fetch media' };
        }
    }
}))
