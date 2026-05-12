import type { NewLink } from "../../types/link.ts"

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function createLinkService (link:NewLink) {
    try{

        const response = await fetch (`${apiUrl}/links`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(link)
        });

        if (!response.ok) {
            throw Error(`Erro ao criar o link: ${response.status}`)
        }

        const data = await response.json();

        if(!data){
            throw Error(`Erro ao criar o link`);
        }

        return data;
    }

    catch (e) {
        console.error(`Erro ao criar o link: ${e}`)
    }
}