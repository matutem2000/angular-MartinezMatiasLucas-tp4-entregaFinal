import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Usuario } from "../../../../layouts/dashboard/pages/usuarios/models/usuarios.interface";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set auth user': props<{ user: Usuario}>(),
        'logout': emptyProps()
    }
})