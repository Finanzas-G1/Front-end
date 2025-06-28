import { Component, OnInit } from '@angular/core';
import { BondsService } from '../services/bonds.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {CurrencyPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon'; // Asegúrate de importar el servicio correctamente
import { Router } from '@angular/router'; // Importar Router para navegación

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  imports: [
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatFormField,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    CurrencyPipe,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatIconButton
  ],
  styleUrls: ['./bonds.component.css']
})
export class BondsComponent implements OnInit {
  bondFormData = {
    nombre: '',
    tasa: 0,
    plazo: 0,
    monto: 0
  };

  valoraciones: any[] = [];
  displayedColumns: string[] = ['nombre', 'tasa', 'plazo', 'monto', 'acciones'];

  constructor(private bondsService: BondsService, private router: Router) {}

  ngOnInit(): void {
    this.loadBonds();
  }

  loadBonds() {
    this.bondsService.getBonds().subscribe(response => {
      this.valoraciones = response;
    });
  }

  // Método para agregar un bono
  onSubmit() {
    if (this.bondFormData.nombre && this.bondFormData.tasa && this.bondFormData.plazo && this.bondFormData.monto) {
      const newBond = {
        ...this.bondFormData,
        usuarioId: '1'  // Suponiendo que el ID del usuario es 1
      };

      this.bondsService.addBond(newBond).subscribe(response => {
        console.log('Bono agregado:', response);
        this.loadBonds();  // Recargar la lista de bonos después de agregar uno nuevo
        this.bondFormData = { nombre: '', tasa: 0, plazo: 0, monto: 0 };  // Limpiar el formulario
      });
    }
  }

  // Método para navegar a la página de Home
  navigateToHome(): void {
    this.router.navigate(['/inicio']);
  }

  // Método para eliminar una valoración de bono
  deleteBond(bondId: string) {
    this.bondsService.deleteBond(bondId).subscribe(() => {
      this.valoraciones = this.valoraciones.filter(bond => bond.id !== bondId);
    });
  }
}
