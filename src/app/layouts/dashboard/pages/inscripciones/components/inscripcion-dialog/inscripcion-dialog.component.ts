import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../../store/inscripciones.actions';
import { Observable } from 'rxjs';
import { Usuario } from '../../../usuarios/models/usuarios.interface';
import { selectInscripcionesCursos, selectInscripcionesEstudiantes } from '../../store/inscripciones.selectors';
import { Curse } from '../../../curses/models/curses.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscripcion-dialog',
  templateUrl: './inscripcion-dialog.component.html',
  styleUrl: './inscripcion-dialog.component.scss'
})
export class InscripcionDialogComponent {

  estudiante$: Observable<Usuario[]>;
  curso$: Observable<Curse[]>;

  inscripcionForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder,
              private matDialogRef: MatDialogRef<InscripcionDialogComponent>){
    this.inscripcionForm= this.formBuilder.group({
      userId: this.formBuilder.control('', Validators.required),
      courseId: this.formBuilder.control('', Validators.required),
    });
    this.store.dispatch(InscripcionesActions.loadEstudiantes())
    this.store.dispatch(InscripcionesActions.loadCursos())
    this.estudiante$= this.store.select(selectInscripcionesEstudiantes)
    this.curso$= this.store.select(selectInscripcionesCursos)
  }


  onSubmit(){
    if(this.inscripcionForm.invalid){
      this.inscripcionForm.markAllAsTouched();
    }else{
      this.store.dispatch(InscripcionesActions.createAsignacion({data: this.inscripcionForm.value}));
      this.matDialogRef.close();
}
}
}