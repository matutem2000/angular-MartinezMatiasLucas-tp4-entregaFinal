import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UserDataService } from '../../../../core/services/user-data.service';
import { Usuario } from './models/usuarios.interface';
import { LoadingService } from '../../../../core/services/loading.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})


export class UsuariosComponent implements OnInit{
  showButton: boolean;
  displayedColumns: string[] = ['id', 'apellidoYnombre', 'email', 'rol', 'acciones'];
  dataSource: Usuario[] = [];
  
  
  constructor(
              public dialog: MatDialog, 
              private userDataService: UserDataService, 
              private loadingService: LoadingService){
                this.showButton = !this.userDataService.getUserRol();
              }

  //Listar usuarios
  ngOnInit(): void {
    this.loadingService.setIsLoading(true);

    this.userDataService.getUsuarios().subscribe({
      next: (usuario) =>{
        this.dataSource=usuario;
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    });
  }

  //Crear usuario
  onUserSubmitted(ev: Usuario): void {
    this.loadingService.setIsLoading(true);
    this.userDataService
    .createUser({...ev}).subscribe({
      next: (usuarios) =>{
        this.dataSource=[...usuarios];
      },
      complete:() =>{
        this.loadingService.setIsLoading(false);
      }
    })
  }
  
  //Eliminar usuario
  eliminarUsuario(usuario: Usuario): void {
    this.loadingService.setIsLoading(true);
    this.userDataService
    .eliminarUsuario({...usuario}).subscribe({
      next: (usuarios) =>{
        this.dataSource=[...usuarios];
      },
      complete:() =>{
        this.loadingService.setIsLoading(false);
      }
    });
}


  //MOdificar usuario
  modificarUsuario(usuario: Usuario): void {
    this.loadingService.setIsLoading(true);
     this.userDataService
    .modificarUsuario({...usuario}).subscribe({
      next: (usuarios) =>{
        this.dataSource=[...usuarios];
      },
      complete:() =>{
        this.loadingService.setIsLoading(false);
      }
    }); 
  }
  
  
  }

