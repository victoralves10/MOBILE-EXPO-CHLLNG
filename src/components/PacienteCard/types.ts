import { PacienteItem } from "../../models/Paciente";

// props do card de paciente
export interface PacienteCardProps {
    paciente: PacienteItem;
    onPress: () => void;
}
