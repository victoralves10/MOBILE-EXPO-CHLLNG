import { useState } from "react";

// olho de mostrar e esconder a senha
export function useSenhaVisivel() {
    const [visivel, setVisivel] = useState(false);

    return {
        escondida: !visivel,
        iconeNome: visivel ? "eye-off" : "eye",
        alternar: () => setVisivel(!visivel),
    };
}
