import { useEffect } from "react";
import Routes from "./src/navigation/index";
import { executarSeedSeNecessario } from "./src/storage/seedStorage";

export default function App() {

    // executa o seed uma vez quando o app abre, popula os dados iniciais
    useEffect(() => {
        executarSeedSeNecessario();
    }, []);

    return <Routes />;
}