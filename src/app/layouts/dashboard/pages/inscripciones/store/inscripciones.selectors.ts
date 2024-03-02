import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripciones from './inscripciones.reducer';

export const selectInscripcionesState = createFeatureSelector<fromInscripciones.State>(
  fromInscripciones.inscripcionesFeatureKey
);


export const selectInscripciones = createSelector(
  selectInscripcionesState,
  (state: fromInscripciones.State) => state.inscripcion
);

 export const selectLoading = createSelector(
  selectInscripcionesState,
  (state: fromInscripciones.State) => state.loading
); 

export const selectInscripcionesEstudiantes = createSelector(
  selectInscripcionesState,
  (state: fromInscripciones.State) => state.estudiante
);

export const selectInscripcionesCursos = createSelector(
  selectInscripcionesState,
  (state: fromInscripciones.State) => state.curso
)