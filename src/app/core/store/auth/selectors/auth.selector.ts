import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, featureName } from "../reducers/auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(featureName);

export const selectAuthUser = createSelector(selectAuthState, (state)=>state.user);