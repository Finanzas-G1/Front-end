import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {CurrencyPipe} from '@angular/common';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    CurrencyPipe,
    MatLabel,
    FormsModule,
    MatHeaderCell,
    MatCell,
    MatTable,
    MatRow,
    MatHeaderRow,
    MatColumnDef,
    MatButton,
    MatInput,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Formulario para el nuevo bono
  bondForm = {
    nombre: '',
    tasa: 0,
    plazo: 0,
    monto: 0
  };

  // Lista de valoraciones de bonos registradas
  valoraciones = [
    { nombre: 'Bono A', tasa: 7.5, plazo: 5, monto: 1000 },
    { nombre: 'Bono B', tasa: 8.0, plazo: 10, monto: 2000 },
  ];

  // Definición de las columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['nombre', 'tasa', 'plazo', 'monto'];

  // Método para agregar nueva valoración
  onSubmit() {
    if (this.bondForm.nombre && this.bondForm.tasa && this.bondForm.plazo && this.bondForm.monto) {
      // Agregar la nueva valoración a la lista de valoraciones
      this.valoraciones.push({ ...this.bondForm });

      // Limpiar el formulario
      this.bondForm = { nombre: '', tasa: 0, plazo: 0, monto: 0 };
    }
  }
}
