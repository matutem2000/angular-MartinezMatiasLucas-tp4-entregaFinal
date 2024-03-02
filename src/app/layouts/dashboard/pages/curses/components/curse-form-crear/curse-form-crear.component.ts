
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurseDataService } from '../../../../../../core/services/curse-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Curse } from '../../models/curses.interfaces';


@Component({
  selector: 'app-curse-form-crear',
  templateUrl: './curse-form-crear.component.html',
  styleUrl: './curse-form-crear.component.scss'
})
export class CurseFormCrearComponent  {
  materiaForm: FormGroup;

  constructor(private fb: FormBuilder, private curseDataService: CurseDataService, private dialogRef: MatDialogRef<CurseFormCrearComponent>) {
    // Inicializa materiaForm en el constructor
    this.materiaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.materiaForm.valid) {
      const nombre = this.materiaForm.value.nombre;
      this.curseDataService.guardarCurso(nombre).subscribe(
        () => {
          console.log('El curso se guardó correctamente.');
        },
        error => {
          console.error('Error al guardar el curso:', error);
          alert('Error al guardar el curso. Consulte la consola para obtener más detalles.');
        }
        
      );
      
       // Cerrar el diálogo después de guardar
       this.dialogRef.close();

       // También puedes cerrar el formulario, limpiar los campos, etc.
       this.materiaForm.reset();
    }
  }
  
}
