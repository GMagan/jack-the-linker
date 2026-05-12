export interface Link {
    id: number,
    originalURL: string,
    shortCode: string,
    createdAt: Date
};

export interface NewLink {
    original_url: string,
};