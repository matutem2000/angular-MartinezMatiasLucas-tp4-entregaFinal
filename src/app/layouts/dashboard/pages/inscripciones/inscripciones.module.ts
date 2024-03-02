import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesComponent } from './inscripciones.component';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './store/inscripciones.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionesFeature } from './store/inscripciones.reducer';
import { SharedModule } from '../../../../shared/shared.module';
import { InscripcionDialogComponent } from './components/inscripcion-dialog/inscripcion-dialog.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionDialogComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule,
    MatTableModule,
    StoreModule.forFeature(inscripcionesFeature),
    EffectsModule.forFeature([InscripcionesEffects]),
   
  ]
})
export class InscripcionesModule { }
