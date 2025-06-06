import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../application/login.service';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
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
          this.authService.setUser(response.user);
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
