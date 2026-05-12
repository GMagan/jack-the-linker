import { createLinkService } from "../../../services/links/createLink";
import "./createLink.css"
import { useState } from "react";

export default function createLinkScreen() {
    const [URL, setURL] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setResult("");

        try {
            const data = await createLinkService({ original_url: URL });

            if (!data) {
                setError("Erro ao criar link");
                return;
            }

            setResult(data.short_code);
            setURL("");
        } catch {
            setError("Erro no servidor");
        }
    };

    return (
        <div className="CreateLinkContainer">
            <div className="CreateLinkContent">

                <div className="CreateLinkLogo">
                    JackTheLinker
                </div>

                <form className="CreateLinkBox" onSubmit={handleCreate}>
                    <h2 className="CreateLinkTitle">
                        Encurte seu link
                    </h2>

                    <input
                        className="CreateLinkInput"
                        type="text"
                        placeholder="https://exemplo.com"
                        value={URL}
                        onChange={(e) => setURL(e.target.value)}
                    />

                    <button className="CreateLinkButton" type="submit">
                        Encurtar
                    </button>

                    {result && (
                        <div className="CreateLinkResult">
                            <p>Seu link encurtado:</p>

                            <a
                                href={`${import.meta.env.VITE_BASE_URL}/r/${result}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {`${import.meta.env.VITE_BASE_URL}/r/${result}`}
                            </a>
                        </div>
                    )}

                    {error && (
                        <p className="CreateLinkError">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}