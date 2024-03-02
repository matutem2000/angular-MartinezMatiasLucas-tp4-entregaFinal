import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';
import { selectInscripciones, selectLoading,  } from './store/inscripciones.selectors';
import { Observable } from 'rxjs';
import { Inscripcion } from './models/inscripciones.interface';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionDialogComponent } from './components/inscripcion-dialog/inscripcion-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent {

  showButton: boolean;
  displayedColumns: string[] = ['id', 'alumno', 'curso'];
  dataSource: MatTableDataSource<Inscripcion>
  
  inscripciones$: Observable<Inscripcion[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store,
    private matDialog: MatDialog,
    private userDataService: UserDataService) {
    this.dataSource = new MatTableDataSource(); 
    this.inscripciones$ = this.store.select(selectInscripciones);
    this.loading$= this.store.select(selectLoading);
    this.store.dispatch(InscripcionesActions.loadInscripcioness());
    this.inscripciones$.subscribe(data => {
    this.dataSource.data = data; 
    });
    this.showButton = !this.userDataService.getUserRol();
  }

  createInscripcion(): void {
    this.matDialog.open(InscripcionDialogComponent);
  }

 
}
