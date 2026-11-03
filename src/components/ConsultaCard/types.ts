import { ConsultaResumo } from "../../models/Consulta";

// props do card de consulta
export interface ConsultaCardProps {
    consulta: ConsultaResumo;
    onPress: () => void;
    variante?: "lista" | "cartao";
}
