import { Component } from '@angular/core';
import { Curse } from './models/curses.interfaces';
import { LoadingService } from '../../../../core/services/loading.service';
import { CurseDataService } from '../../../../core/services/curse-data.service';
import { MatDialog } from '@angular/material/dialog';
import { CurseFormCrearComponent } from './components/curse-form-crear/curse-form-crear.component';


@Component({
  selector: 'app-curses',
  templateUrl: './curses.component.html',
  styleUrl: './curses.component.scss'
})
export class CursesComponent {

  displayedColumns: string[] = ['id', 'nombreCurso', 'acciones'];
  dataSourceCurse: Curse[] = [];
  cursos: Curse[] = [];
    constructor(public dialog: MatDialog, private curseDataService: CurseDataService, private loadingService: LoadingService){}

  //Listar cursos
  ngOnInit(): void {
    this.loadingService.setIsLoading(true);
    this.curseDataService.getCurses().subscribe({
      next: (cursos) =>{
        this.dataSourceCurse=cursos;
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    });
  }

  //Agregar cursos
  agregarNuevoCurse(){
    const dialogRef = this.dialog.open(CurseFormCrearComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

          this.ngOnInit();
       
      }
    });
  };
 
  //Eliminar usuario
  eliminarCurse(curso: Curse): void {
      this.loadingService.setIsLoading(true);
      this.curseDataService
      .eliminarCurso({...curso}).subscribe({
        next: (curso) =>{
          //console.log('Usuarios actualizados:', usuarios);
          this.dataSourceCurse=[...curso];
        },
        complete:() =>{
          this.loadingService.setIsLoading(false);
        }
      });
  
}


  //MOdificar usuario
  modificarCurso(curso: Curse): void {
    this.loadingService.setIsLoading(true);
     this.curseDataService
    .modificarCurso({...curso}).subscribe({
      next: (curso) =>{
        //console.log('Usuarios actualizados:', usuarios);
        this.dataSourceCurse=[...curso];
      },
      complete:() =>{
        this.loadingService.setIsLoading(false);
      }
    }); 
  }
}
