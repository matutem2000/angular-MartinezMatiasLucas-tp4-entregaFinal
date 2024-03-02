import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], 
})

export class LoginComponent {
  loginForm: FormGroup;
  mostrarPass = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();     
    } else {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Credenciales incorrectas.';
          } else if (error.status === 0) {
            this.errorMessage = 'Error al conectar con el servidor. Por favor, intenta de nuevo más tarde.';
          } else {
            this.errorMessage = 'Ha ocurrido un error. Por favor, intenta de nuevo más tarde.';
          }
        }
      );
    }
  }
}
