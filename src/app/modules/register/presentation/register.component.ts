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
      // Paso 1: Registrar el nuevo usuario
      this.http.post('https://json-squema.onrender.com/users', this.form.value).subscribe((userResponse: any) => {
        alert('Usuario registrado con éxito');

        // Crear configuración predeterminada para el nuevo usuario
        const newConfig = {
          currency: 'PEN',
          interestType: 'Nominal',
          capitalization: 'Mensual',
          gracePeriod: 'Parcial',
          id: userResponse.id  // Usar el id del usuario registrado
        };

        // Paso 2: Crear la configuración del usuario
        this.http.post('https://json-squema.onrender.com/config', newConfig).subscribe(() => {
          console.log('Configuración predeterminada creada');
        }, (error) => {
          console.error('Error al crear la configuración predeterminada', error);
        });

        // Limpiar el formulario y redirigir al login
        this.form.reset();
        this.router.navigate(['/login']);
      }, (error) => {
        console.error('Error al registrar el usuario', error);
        alert('Hubo un problema al registrar el usuario');
      });
    } else {
      alert('Verifica los campos del formulario');
    }
  }
}
