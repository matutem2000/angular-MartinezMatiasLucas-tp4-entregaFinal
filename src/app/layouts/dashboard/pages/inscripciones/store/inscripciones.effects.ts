import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionService } from '../inscripciones.service';
import { UserDataService } from '../../../../../core/services/user-data.service';
import { CurseDataService } from '../../../../../core/services/curse-data.service';


@Injectable()
export class InscripcionesEffects {

  loadInscripcioness$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.loadInscripcioness),
      concatMap(() =>
        this.inscripcionesService.getInscripciones().pipe(
          map(data => InscripcionesActions.loadInscripcionessSuccess({ data })),
          catchError(error => of(InscripcionesActions.loadInscripcionessFailure({ error }))))
      )
    );
  });

 loadEstudiantes$=createEffect(()=>{
  return this.actions$.pipe(ofType(InscripcionesActions.loadEstudiantes),
  concatMap(()=>this.userDataService.getUsuariosPorRol('estudiante').pipe(map((resp)=> InscripcionesActions.loadEstudiantesSuccess({data: resp})),
  catchError(error=>of(InscripcionesActions.loadEstudiantesFailure({error}))))));
 });

 loadCursoss$=createEffect(()=>{
  return this.actions$.pipe(
    ofType(InscripcionesActions.loadCursos),
  concatMap(()=>{
    return this.curseDataService.getCurses().pipe(
      map((resp)=> InscripcionesActions.loadCursosSuccess({data: resp})),
      catchError(error=>of(InscripcionesActions.loadCursosFailure({error})))
    )
  })
  )
  });

  createAsignacion$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(InscripcionesActions.createAsignacion),
      concatMap((action)=>{
        return this.inscripcionesService.asignarCurso(action.data).pipe(
          map((resp)=> InscripcionesActions.createAsignacionSuccess({data: resp})),
          catchError(error=>of(InscripcionesActions.createAsignacionFailure({error})))
        )
      })
    )
  });

  createAsignacionSuccess$= createEffect(()=>{
    return this.actions$.pipe(
      ofType(InscripcionesActions.createAsignacionSuccess),
      map(() => InscripcionesActions.loadInscripcioness())
    )
  })

  constructor(private actions$: Actions,
              private inscripcionesService: InscripcionService,
              private userDataService: UserDataService,
              private curseDataService: CurseDataService) {}
}
