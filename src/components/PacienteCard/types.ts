import { PacienteItem } from "../../models/Paciente";

// o card só precisa do paciente (que já vem com o responsável) e do clique
export interface PacienteCardProps {
    paciente: PacienteItem;
    onPress: () => void;
}