import { Injectable } from '@angular/core';
import { Usuario } from '../../dashboard/pages/usuarios/models/usuarios.interface';
import { Router } from '@angular/router';
import { LoginData } from '../../models/login.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, delay, finalize, map, of, tap } from 'rxjs';
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
//authUser: Usuario | null= null;

  login(data:LoginData): Observable<Usuario[]> {
    return this.httpClient
    .get<Usuario[]>(`${environment.apiURL}/users?email=${data.email}&password=${data.password}`)
    .pipe(
      tap((response) => {
        if (!!response[0]){
          //this.authUser = response[0];
          
          //console.log('esto es this.authUser', this.authUser);
        this.store.dispatch(AuthActions.setAuthUser({user:response[0]}));
         localStorage.setItem('token', response[0].token);
          this.router.navigate(['/dashboard']);
        }else{
          this.openSnackBar('Error de usuario o contraseña');
        }
      
      })
    )
 
  }

  logout(): void {
    //this.authUser=null;
    this.store.dispatch(AuthActions.logout());
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  verificarToken() {
   
  return this.httpClient.get<Usuario[]>(
    `${environment.apiURL}/users?token=${localStorage.getItem('token')}`
    ).pipe(
      map((response)=>{
        if(response.length){
          //this.authUser = response[0];
          return true;
        }else{
          this.openSnackBar('Error de usuario o contraseña');
        //  this.authUser = null;
          localStorage.removeItem('token');
          return false;
        }
      })
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
