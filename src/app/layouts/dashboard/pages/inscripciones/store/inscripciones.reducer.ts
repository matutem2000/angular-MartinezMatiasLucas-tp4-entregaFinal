import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from '../models/inscripciones.interface';
import { Usuario } from '../../usuarios/models/usuarios.interface';
import { Curse } from '../../curses/models/curses.interfaces';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  inscripcion: Inscripcion[];
  estudiante: Usuario[];
  curso: Curse[];
  loading: boolean;
  loadingEstudiantes: boolean;
  error: unknown;
}

export const initialState: State = {
  inscripcion: [],
  estudiante: [],
  curso: [],
  loading: false,
  loadingEstudiantes: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripcioness, state => ({...state, loading:true})),
  on(InscripcionesActions.loadInscripcionessSuccess, (state, action) => ({...state, loading:false, inscripcion: action.data})),
  on(InscripcionesActions.loadInscripcionessFailure, (state, action) => ({...state, loading:false, error: action.error})),
  on(InscripcionesActions.loadEstudiantes, state => ({...state, loadingEstudiantes:true})),
  on(InscripcionesActions.loadEstudiantesSuccess, (state, action) => ({...state, loading:false, estudiante: action.data})),
  on(InscripcionesActions.loadEstudiantesFailure, (state, action) => ({...state, loading:false, error: action.error})),
  on(InscripcionesActions.loadCursos, state => ({...state, loading:true})),
  on(InscripcionesActions.loadCursosSuccess, (state, action) => ({...state, loading:false, curso: action.data})),
  on(InscripcionesActions.loadCursosFailure, (state, action) => ({...state, loading:false, error: action.error}))
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});

