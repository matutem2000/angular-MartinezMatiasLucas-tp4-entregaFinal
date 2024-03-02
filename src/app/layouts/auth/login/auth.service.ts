import { Injectable } from '@angular/core';
import { Usuario } from '../../dashboard/pages/usuarios/models/usuarios.interface';
import { Router } from '@angular/router';
import { LoginData } from '../../models/login.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, delay, finalize, map, of, tap } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../core/store/auth/actions/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private loadingService: LoadingService,
              private httpClient: HttpClient,
              private store: Store,
              private snackBar: MatSnackBar) { }


  login(data: LoginData): Observable<Usuario[]> {
    return this.httpClient
      .get<Usuario[]>(`${environment.apiURL}/users?email=${data.email}&password=${data.password}`)
      .pipe(
        tap((response) => {
          if (response.length > 0) {
            const user = response[0];
            switch (user.rol) {
              case 'administrador':
                this.store.dispatch(AuthActions.setAuthUser({ user }));
                localStorage.setItem('token', user.token);
                localStorage.setItem('userRole', user.rol);
                this.router.navigate(['/dashboard']);
                break;
              case 'profesor':
              case 'estudiante':
                this.store.dispatch(AuthActions.setAuthUser({ user }));
                localStorage.setItem('token', user.token);
                localStorage.setItem('userRole', user.rol);
                this.router.navigate(['/dashboard/inscripciones']);
                break;
              default:
                this.openSnackBar('Error de usuario o contraseña');
                break;
            }
          } else {
            this.openSnackBar('Error de usuario o contraseña');
          }
        })
      );
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  verificarToken() {
   
  return this.httpClient.get<Usuario[]>(
    `${environment.apiURL}/users?token=${localStorage.getItem('token')}`
    ).pipe(
      map((response)=>{
        if(response.length){
          return true;
        }else{
          this.openSnackBar('Error de usuario o contraseña');
        //  this.authUser = null;
          localStorage.removeItem('token');
          return false;
        }
      }),
      catchError(() => of(false))
    )
  }
  

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
