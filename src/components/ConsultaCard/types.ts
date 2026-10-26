import { ConsultaResumo } from "../../models/Consulta";

// o card só precisa da consulta (que já vem com o animal) e do clique
export interface ConsultaCardProps {
    consulta: ConsultaResumo;
    onPress: () => void;
    variante?: "lista" | "cartao";
}