import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { MockProvider } from "ng-mocks";
import { LoadingService } from "../../../core/services/loading.service";
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import { environment } from "../../../../environments/environment";
import { Usuario } from "../../dashboard/pages/usuarios/models/usuarios.interface";

describe('Pruebas de AuthService', () => {

    let authService: AuthService;
    let httpControler: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                MockProvider(LoadingService),
            ], 
            imports: [HttpClientTestingModule],
        })
        authService = TestBed.inject(AuthService);
        httpControler= TestBed.inject(HttpTestingController);
    })

    it('Deberia estar declarado', () => {
        expect(authService).toBeTruthy();
    })

    it('El método login() debería traer todos los datos del usuario', () => {
        const loginData = { email: 'mock@mail.com', password: 'password' };
        const MOCK_RESONSE: Usuario[] =[
           
           { id:23,
            nombre: 'mockName',
            apellido: 'mockApellido',
            email: 'mock@mail.com',
            password: 'password',
            rol: 'admin',
            token: 'mockToken'
        }
        ];
        authService.login(loginData).subscribe({
            next: (user) => {
                expect(authService.authUser).toBeTruthy(); 
                expect(authService.authUser).toEqual(MOCK_RESONSE[0]);
                        }
        });

          httpControler.expectOne({
            url: `${environment.apiURL}/users?email=mock@mail.com&password=password`,
            method: 'GET',
          }).flush(MOCK_RESONSE);
        });
    });
 