import { Animal } from "../../models/Animal";
import { Responsavel } from "../../models/Responsavel";

// tipagem das props que o PacienteCard recebe
export interface PacienteCardProps {
    animal: Animal; // dados do animal
    responsavel: Responsavel; // dados do responsável vinculado
    onPress: () => void; // clicou no card
    onPressIcone: () => void; // clicou no ícone do whatsapp
}