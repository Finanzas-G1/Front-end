import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { ConfigService } from '../services/config.service';  // Importa el servicio

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatButton,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class ConfigComponent implements OnInit {

  public configForm!: FormGroup;
  currentUserConfig: any;
  userId: string = localStorage.getItem('usuarioId') || '';  // Obtener userId desde localStorage

  currencies = [
    { label: 'Moneda: USD', value: 'USD' },
    { label: 'Moneda: PEN', value: 'PEN' }
  ];

  capitalizations = ['Anual', 'Semestral', 'Trimestral', 'Mensual', 'Diaria'];

  constructor(private fb: FormBuilder, private router: Router, private configService: ConfigService) {}

  ngOnInit(): void {
    // Obtener la configuración del usuario desde la API usando el ConfigService
    this.configService.getConfig(this.userId).subscribe(
      (data) => {
        // Asignar la configuración del usuario obtenida
        this.currentUserConfig = data;

        // Inicializar el formulario con la configuración del usuario
        this.configForm = this.fb.group({
          currency: [this.currentUserConfig.currency, Validators.required], // 'currency' en lugar de 'moneda'
          interestType: [this.currentUserConfig.interestType, Validators.required],
          capitalization: [this.currentUserConfig.capitalization, Validators.required],
          gracePeriod: [this.currentUserConfig.gracePeriod, Validators.required]
        });
      },
      (error) => {
        console.error('Error al obtener la configuración del usuario', error);
        // Redirigir o manejar el error si no se obtiene la configuración
        this.router.navigate(['/login']);
      }
    );
  }

  // Método para navegar a la página de Home
  navigateToHome(): void {
    this.router.navigate(['/inicio']);
  }

  // Método para guardar la configuración en el backend
  saveConfig() {
    // Verificar si el formulario es válido
    if (this.configForm.valid) {
      const currencyValue = this.configForm.value.currency;

      // Verificar si currencyValue está en currencyMap de forma segura (aunque no lo estamos mapeando ahora)
      const payload = {
        ...this.configForm.value,
        currency: currencyValue  // Usamos 'currency' tal como está
      };

      console.log('Enviando al servidor con moneda:', payload);

      // Enviar la configuración al servidor
      this.configService.updateConfig(this.userId, payload).subscribe(
        (response) => {
          console.log('Configuración guardada en el servidor:', response);
          alert('Configuración guardada con éxito');
        },
        (error) => {
          console.error('Error al guardar la configuración', error);
        }
      );
    } else {
      console.error('Formulario inválido', this.configForm.errors);
    }
  }
}
