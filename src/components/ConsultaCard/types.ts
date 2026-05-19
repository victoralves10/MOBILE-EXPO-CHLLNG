import { Consulta } from "../../models/Consulta";
import { Animal } from "../../models/Animal";

// tipagem das props que o ConsultaCard recebe
export interface ConsultaCardProps {
    consulta: Consulta; // dados da consulta
    animal: Animal; // dados do animal vinculado
    onPress: () => void; // clicou no card
    onPressIcone: () => void; // clicou no ícone de câmera
}