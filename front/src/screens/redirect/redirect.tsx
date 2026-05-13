import { useEffect, useState } from "react";
import { getLinkByCode } from "../../services/links/getLinkByCode";
import { useParams } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import "./redirect.css"

export default function redirectScreen() {
    const { code } = useParams({ strict: false });
    const [seconds, setSeconds] = useState(5);
    const [url, setUrl] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [cancelled, setCancelled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLink() {
            const result = await getLinkByCode(code!);

            if (result?.notFound) {
                setError("Link não encontrado 😕");
            } else if (result?.error) {
                setError("Erro no servidor");
            } else {
                setUrl(result.original_url);
            }
        }

        fetchLink();
    }, [code]);

    useEffect(() => {
        if (!url) return;
        if (cancelled) return;

        if (seconds === 0) {
            window.location.href = url;
            return;
        }

        const timer = setTimeout(() => {
            setSeconds((s) => s - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [seconds, url]);

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!url) {
        return <p>Carregando...</p>;
    }

    if (cancelled) {
        return (
            <div className="RedirectContainer">
                <div className="RedirectContent">
                    <div className="CreateLinkLogo">
                        JackTheLinker
                    </div>

                    <div className="RedirectBox">
                        <h1 className="RedirectTitle">
                            Redirecionamento cancelado
                        </h1>
                        <p>Destino original: {url}</p>

                        <button className="RedirectButton" onClick={() => navigate({ to: "/createlink" })}>
                            Voltar
                        </button>
                        <button className="RedirectCancelButton" onClick={() => window.location.replace(url)}>
                            Continuar mesmo assim
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="RedirectContainer">
            <div className="RedirectContent">
                <div className="CreateLinkLogo">
                    JackTheLinker
                </div>

                <div className="RedirectBox">
                    <h1 className="RedirectTitle">
                        Você será redirecionado em {seconds} segundos...
                    </h1>

                    <p>Destino: {url}</p>

                    <button className="RedirectButton" onClick={() => (window.location.replace(url))}>
                        Ir agora
                    </button>
                    <button className="RedirectCancelButton" onClick={() => setCancelled(true)}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}