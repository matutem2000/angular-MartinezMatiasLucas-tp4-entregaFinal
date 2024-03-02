import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'usuarios', 
    loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule)
  },
  {
    path: 'cursos', 
    loadChildren: () => import('./pages/curses/curses.module').then(m => m.CursesModule)
  },
  {
    path: 'inscripciones', 
    loadChildren:  () => import('./pages/inscripciones/inscripciones.module').then((m)=>m.InscripcionesModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
