import { createReducer, on } from "@ngrx/store";
import { Usuario } from "../../../../layouts/dashboard/pages/usuarios/models/usuarios.interface";
import { AuthActions } from "../actions/auth.action";

export const featureName = 'auth';

export interface AuthState{
    user: Usuario | null;
}

const initialState: AuthState = {
    user: null
};
export const authReducer = createReducer(initialState, 
    on(AuthActions.setAuthUser, (state, action)=>{
    return{
        ...state,
         user: action.user
    }
}),
on(AuthActions.logout, ()=> initialState)
);