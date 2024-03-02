import { Curse } from "../../curses/models/curses.interfaces";
import { Usuario } from "../../usuarios/models/usuarios.interface";

export interface Inscripcion {
    id: string | number;
    userId: string | number;
    curseId: string | number;
    user?: Usuario;
    curse?: Curse;
}

export interface CrearAsignarCurso{
    userId: string | number;
    curseId: string | number;
}