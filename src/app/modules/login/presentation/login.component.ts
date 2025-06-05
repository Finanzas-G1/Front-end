
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoginService } from '../application/login.service';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    // 👈 AÑADIR ESTO
  ]
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const {email, password} = this.form.value;
    this.loginService.login(email, password).subscribe(user => {
      console.log('Usuario autenticado:', user);
      // Aquí puedes redirigir al dashboard
    });
  }
}
