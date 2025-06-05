import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../application/login.service';
import { Router } from '@angular/router'; // Solo Router se necesita aquí
import { CommonModule } from '@angular/common'; // Si es necesario para el módulo de características
import { AuthService } from '../../../services/auth.service'; // Asegúrate de que AuthService está importado

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule], // Solo CommonModule y ReactiveFormsModule se necesitan aquí
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService // Inyectar AuthService aquí
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { email, password } = this.form.value;

    this.loginService.login(email, password).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Usuario autenticado:', response.user);
          this.authService.setUser(response.user); // Almacena el usuario en el servicio
          this.router.navigate(['/inicio']).then(() => {
            console.log('Redirigido al inicio');
          });
        } else {
          console.error('Error de autenticación:', response.message);
        }
      },
      (error) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }
}
