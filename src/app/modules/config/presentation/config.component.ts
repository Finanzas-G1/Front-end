import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  configForm!: FormGroup;
  userId = localStorage.getItem('usuarioId') || '';

  currencies = [
    { label: 'USD', value: 'USD' },
    { label: 'PEN', value: 'PEN' }
  ];

  capitalizations = ['Anual', 'Semestral', 'Trimestral', 'Mensual', 'Diaria'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    // 1) Inicializamos el formulario antes de cargar datos
    this.configForm = this.fb.group({
      currency: ['', Validators.required],
      interestType: ['', Validators.required],
      capitalization: ['', Validators.required],
      gracePeriod: ['', Validators.required]
    });

    // 2) Cargamos la configuración existente y parchamos el form
    this.configService.getConfig(this.userId).subscribe(
      data => {
        this.configForm.patchValue({
          currency: data.currency,
          interestType: data.interestType,
          capitalization: data.capitalization,
          gracePeriod: data.gracePeriod
        });
      },
      error => {
        console.error('Error fetching config', error);
        this.router.navigate(['/login']);
      }
    );
  }

  navigateToHome(): void {
    this.router.navigate(['/inicio']);
  }

  saveConfig(): void {
    // Forzamos validación de todos los campos
    this.configForm.markAllAsTouched();

    if (this.configForm.invalid) {
      console.warn('Formulario inválido:', this.configForm.value);
      return;
    }

    // Construimos el payload **exacto** que el backend espera
    const payload = this.configForm.value;
    console.log('Saving payload:', payload);

    this.configService.updateConfig(this.userId, payload).subscribe(
      response => {
        console.log('Config saved:', response);
        alert('Configuración guardada con éxito');
      },
      error => {
        console.error('Error saving config', error);
        alert('Error al guardar configuración');
      }
    );
  }
}
