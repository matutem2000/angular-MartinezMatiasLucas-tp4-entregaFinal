import { Component } from '@angular/core';
import { AuthService } from '../auth/login/auth.service';
import { Store } from '@ngrx/store';
import { Usuario } from './pages/usuarios/models/usuarios.interface';
import { Observable } from 'rxjs';
import { selectAuthUser } from '../../core/store/auth/selectors/auth.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;

  authUser$: Observable<Usuario | null>;
  constructor(private authService: AuthService,
              private store:Store) {
                this.authUser$=this.store.select(selectAuthUser)
              }

  logout(): void {
    this.authService.logout();
  }
}
