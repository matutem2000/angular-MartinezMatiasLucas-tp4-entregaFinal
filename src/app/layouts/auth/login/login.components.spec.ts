import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { AuthService } from "./auth.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SharedModule } from "../../../shared/shared.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MockProvider } from 'ng-mocks';
import { Validators } from "@angular/forms";

describe('LoginComponent', () => {
    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [SharedModule, MatDialogModule],
            providers: [
                MockProvider(AuthService),
            ],
        });

        component = TestBed.createComponent(LoginComponent).componentInstance;
    });

    it('El LoginComponent debe instanciarse correctamente', () => {
        expect(component).toBeTruthy();
    });

    it('El email debe ser requerido', () => {
        expect(component.loginForm.get('email')?.hasValidator(Validators.required)).toBeTrue();
    });

    it('El password debe ser requerido', () => {
        expect(component.loginForm.get('password')?.hasValidator(Validators.required)).toBeTrue();
    });

    it('Si el formulario es inváliddo debe mostrar sus campos como tocados', () => {
        component.loginForm.patchValue({
            password: '',
            email:''
        })

        expect(component.loginForm.invalid).toBeTrue();

        const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');

        component.onSubmit();
        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    });
});
