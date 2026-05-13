const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function getLinkByCode(code: string) {
    try {
        const response = await fetch(`${apiUrl}/links/r/${code}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 404) {
            return { notFound: true };
        }

        if (!response.ok) {
            throw Error(`Erro ao encontrar o link: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
            throw Error(`Erro ao encontrar o link`);
        }
        return data;
    }

    catch (e) {
        console.error(`Erro ao encontrar o link: ${e}`);
        return { error: true };
    }

};