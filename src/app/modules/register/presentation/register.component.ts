import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid && this.form.value.password === this.form.value.confirmPassword) {
      this.http.post('http://localhost:3000/users', this.form.value).subscribe(() => {
        alert('Usuario registrado con éxito');
        this.form.reset();
        this.router.navigate(['/login']);
      });
    } else {
      alert('Verifica los campos del formulario');
    }
  }
}
