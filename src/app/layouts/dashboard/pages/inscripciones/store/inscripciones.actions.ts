import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CrearAsignarCurso, Inscripcion } from '../models/inscripciones.interface';
import { Usuario } from '../../usuarios/models/usuarios.interface';
import { Curse } from '../../curses/models/curses.interfaces';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripcioness': emptyProps(),
    'Load Inscripcioness Success': props<{ data: Inscripcion[] }>(),
    'Load Inscripcioness Failure': props<{ error: unknown }>(),
    'Load Estudiantes': emptyProps(),
    'Load Estudiantes Success': props<{ data: Usuario[] }>(),
    'Load Estudiantes Failure': props<{ error: unknown }>(),
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ data: Curse[] }>(),
    'Load Cursos Failure': props<{ error: unknown }>(),
    'Create Asignacion': props<{data: CrearAsignarCurso}>(),
    'Create Asignacion Success': props<{ data: Inscripcion }>(),
    'Create Asignacion Failure': props<{ error: unknown }>(),
  }
});
