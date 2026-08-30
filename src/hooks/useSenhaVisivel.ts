import { useState } from "react";

// controla o olho de mostrar/esconder senha
export function useSenhaVisivel() {
    const [visivel, setVisivel] = useState(false);

    return {
        visivel,
        escondida: !visivel,
        iconeNome: visivel ? "eye-off" : "eye",
        alternar: () => setVisivel((atual) => !atual),
    };
}