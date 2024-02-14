import { Injectable } from '@angular/core';
import { Curse } from '../../layouts/dashboard/pages/curses/models/curses.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from './loading.service';
import { BehaviorSubject, map, Observable, delay, of, catchError, switchMap, mergeMap, tap } from 'rxjs';
import { ModificarProfesorCursoComponent } from '../../layouts/dashboard/pages/curses/components/modificar-profesor-curso/modificar-profesor-curso.component';
import { ModificarCursoComponent } from '../../layouts/dashboard/pages/curses/components/modificar-curso/modificar-curso.component';
import { EliminarCursoComponent } from '../../layouts/dashboard/pages/curses/components/eliminar-curso/eliminar-curso.component';
import { CurseFormCrearComponent } from '../../layouts/dashboard/pages/curses/components/curse-form-crear/curse-form-crear.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CoursesRoutingModule } from '../../layouts/dashboard/pages/curses/curses-routing.module';


let CURSES_DB:Curse[] = [];
const URL_CURSES= `${environment.apiURL}/courses`;

@Injectable({
  providedIn: 'root'
})
export class CurseDataService {
  private curseSubject: BehaviorSubject<Curse[]> = new BehaviorSubject<Curse[]>([]);
  curses$: Observable<Curse[]> = this.curseSubject.asObservable();


  constructor(
    public dialog: MatDialog, 
    private loadingService: LoadingService,
    private httpClient: HttpClient){};

    
 
//obtener usuarios
getCurses() {
    return this.httpClient.get<Curse[]>(URL_CURSES
    ).pipe(catchError(()=>{
      alert("Error al cargar los cursos");
      return of(CURSES_DB);
    }))
}

//Guardar cursos

guardarCurso(nombre: Curse): Observable<Curse[]> {
  return this.httpClient
    .post<Curse>(URL_CURSES, { nombre })
    .pipe(
      switchMap(() => this.getCurses().pipe(
        tap(curses => console.log('Valores devueltos por getCurses() dentro de guardarCurso:', curses))
      ))
    );
}

  modificarCurso(curso: Curse): Observable<Curse[]> {
    console.log('Curso recibido a modificar', curso);
    const dialogRef = this.dialog.open(ModificarCursoComponent, {
      data: { curso },
    });

    return dialogRef.afterClosed().pipe(
      switchMap((modificado: boolean) => {
        if (modificado) {
          // Si el usuario confirma la modificación, realizar la solicitud HTTP PUT
          return this.httpClient.put<Curse>(`${URL_CURSES}/${curso.id}`, modificado).pipe(
            // Obtener la lista actualizada de usuarios después de modificar el usuario
            switchMap(() => this.getCurses())
          );
        } else {
          // Si el usuario cancela la modificación, devolver la lista actual de usuarios sin cambios
          return this.getCurses();
        }
      })
    );
    
  }

  // Eliminar cuso
eliminarCurso(curso: Curse): Observable<Curse[]> {
 const dialogRef = this.dialog.open(EliminarCursoComponent, {
   data: { curso },
 });
 
 return dialogRef.afterClosed().pipe(
   switchMap((eliminado: boolean) => {
    if (eliminado) {
      // Si el usuario confirma la eliminación, realizar la solicitud HTTP DELETE
      return this.httpClient.delete(`${URL_CURSES}/${curso.id}`).pipe(
        // Obtener la lista actualizada de usuarios después de eliminar el usuario
        switchMap(() => this.getCurses())
      );
    } else {
      // Si el usuario cancela la eliminación, devolver la lista actual de usuarios sin cambios
      return this.getCurses();
    }
  })
 );

}


}

