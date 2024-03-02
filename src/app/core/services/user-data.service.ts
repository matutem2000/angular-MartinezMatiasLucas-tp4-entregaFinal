import { Injectable } from '@angular/core';
import { Usuario } from '../../layouts/dashboard/pages/usuarios/models/usuarios.interface';
import { ModificarUsuarioComponent } from '../../layouts/dashboard/pages/usuarios/components/modificar-usuario/modificar-usuario.component';
import { EliminarUsuarioComponent } from '../../layouts/dashboard/pages/usuarios/components/eliminar-usuario/eliminar-usuario.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Observable, catchError, delay, map, mergeMap, of, switchMap } from 'rxjs';
import { LoadingService } from './loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


let USERS_DB: Usuario[] = [];
const URL_USERS=`${environment.apiURL}/users`;


@Injectable()
export class UserDataService {

  constructor(
              public dialog: MatDialog, 
              private loadingService: LoadingService,
              private httpClient: HttpClient){};

 generateToken(length: number): string {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   let token = '';
   for (let i = 0; i < length; i++) {
     token += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return token;
 }
//obtener usuarios
  getUsuarios() {
    return this.httpClient.get<Usuario[]>(URL_USERS
    ).pipe(catchError(()=>{
      alert("Error al cargar los usuarios");
      return of(USERS_DB);
    }));
}

//obtener rol usuario
getUserRol(): boolean {
  const userRol = localStorage.getItem('userRole');
  return userRol === 'estudiante' || userRol === 'profesor';
}

//crear usuarios
  createUser(payload: Usuario){
    return this.httpClient
    .post<Usuario>(URL_USERS,{ ...payload, token:this.generateToken(5)})
    .pipe(mergeMap(()=> this.getUsuarios()));
  }


// Eliminar usuario

eliminarUsuario(usuario: Usuario): Observable<Usuario[]> {
  const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
    data: { usuario },
  });

  return dialogRef.afterClosed().pipe(
    switchMap((eliminado: boolean) => {
      if (eliminado) {
        // Si el usuario confirma la eliminación, realizar la solicitud HTTP DELETE
        return this.httpClient.delete(`${URL_USERS}/${usuario.id}`).pipe(
          // Obtener la lista actualizada de usuarios después de eliminar el usuario
          switchMap(() => this.getUsuarios())
        );
      } else {
        // Si el usuario cancela la eliminación, devolver la lista actual de usuarios sin cambios
        return this.getUsuarios();
      }
    })
  );
  }


//Modificar usuario
modificarUsuario(usuario: Usuario): Observable<Usuario[]> {
  const dialogRef = this.dialog.open(ModificarUsuarioComponent, {
    data: { usuario },
  });

  return dialogRef.afterClosed().pipe(
    switchMap((usuarioModificado: boolean) => {
      if (usuarioModificado) {
        // Si el usuario confirma la modificación, realizar la solicitud HTTP PUT
        return this.httpClient.put<Usuario>(`${URL_USERS}/${usuario.id}`, usuarioModificado).pipe(
          // Obtener la lista actualizada de usuarios después de modificar el usuario
          switchMap(() => this.getUsuarios())
        );
      } else {
        // Si el usuario cancela la modificación, devolver la lista actual de usuarios sin cambios
        return this.getUsuarios();
      }
    })
  );
}


//Obtener usuario por rol


 getUsuariosPorRol(rol: string): Observable<Usuario[]> {
  
  return this.httpClient.get<Usuario[]>(`${environment.apiURL}/users?rol=${rol}`)
} 



}