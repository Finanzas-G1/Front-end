import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import { Router } from '@angular/router';

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
    MatInput
  ],

})

export class ConfigComponent implements OnInit {

  public configForm!: FormGroup;

  currencies = [
    { label: 'Sol Peruano (PEN)', value: 'PEN' },
    { label: 'Dólar Americano (USD)', value: 'USD' },
  ];

  capitalizations = ['Anual', 'Semestral', 'Trimestral', 'Mensual', 'Diaria'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.configForm = this.fb.group({
      currency: ['PEN', Validators.required],
      interestRate: [0.05, [Validators.required, Validators.min(0), Validators.max(1)]],
      capitalization: ['Mensual', Validators.required],
    });
  }

  // Método para navegar a la página de Home
  navigateToHome(): void {
    this.router.navigate(['/inicio']);
  }

  saveConfig() {

  }
}
