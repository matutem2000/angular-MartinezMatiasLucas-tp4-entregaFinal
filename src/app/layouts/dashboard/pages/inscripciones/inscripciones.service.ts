import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { CrearAsignarCurso, Inscripcion } from "./models/inscripciones.interface";


@Injectable({providedIn: 'root'})
export class InscripcionService {
    constructor(private http: HttpClient){}

    getInscripciones(){
        return this.http.get<Inscripcion[]>(`${environment.apiURL}/inscriptions?_embed=user&_embed=course`);
    }

    //Asignar usuario a curso
    asignarCurso(data: CrearAsignarCurso){
        return this.http.post<Inscripcion>(`${environment.apiURL}/inscriptions`, data);
    }

    
}