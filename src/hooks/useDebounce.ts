import { useEffect, useState } from "react";

// espera o usuário parar de digitar antes de devolver o valor
// assim a busca não vai pro backend a cada letra
export function useDebounce<T>(valor: T, atraso = 250): T {
    const [valorAtrasado, setValorAtrasado] = useState(valor);

    useEffect(() => {
        const timer = setTimeout(() => setValorAtrasado(valor), atraso);
        return () => clearTimeout(timer);
    }, [valor, atraso]);

    return valorAtrasado;
}