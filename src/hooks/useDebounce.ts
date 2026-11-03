import { useEffect, useState } from "react";

// espera o usuário parar de digitar
export function useDebounce<T>(valor: T, atraso = 500): T {
    const [valorAtrasado, setValorAtrasado] = useState(valor);

    useEffect(() => {
        const timer = setTimeout(() => setValorAtrasado(valor), atraso);
        return () => clearTimeout(timer);
    }, [valor, atraso]);

    return valorAtrasado;
}
