import { Component, OnInit } from '@angular/core';
import { BondsService } from '../services/bonds.service';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Bond } from '../bonds/bond.model'; // Importar la interfaz Bond

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
    MatInput,
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
    MatIconButton,
    MatGridTile,
    MatGridList
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

  valoraciones: Bond[] = []; // Usar tipo Bond[]
  displayedColumns: string[] = ['nombre', 'tasa', 'plazo', 'monto', 'acciones'];
  usuarioId: string = localStorage.getItem('usuarioId') || '';

  constructor(private bondsService: BondsService, private router: Router) {}

  ngOnInit(): void {
    if (this.usuarioId) {
      this.loadBonds();
    } else {
      console.log('Usuario no autenticado');
      this.router.navigate(['/login']);
    }
  }

  loadBonds() {
    this.bondsService.getBondsByUser(this.usuarioId).subscribe({
      next: (response: Bond[]) => {
        this.valoraciones = response;
      },
      error: (err) => console.error('Error loading bonds:', err)
    });
  }

  onSubmit() {
    if (this.bondFormData.nombre && this.bondFormData.tasa && this.bondFormData.plazo && this.bondFormData.monto) {
      const newBond: Bond = {
        nombre: this.bondFormData.nombre,
        tasa: this.bondFormData.tasa,
        plazo: this.bondFormData.plazo,
        monto: this.bondFormData.monto,
        usuarioId: this.usuarioId,
        id: '' // El id será generado por el servidor
      };

      this.bondsService.addBond(newBond).subscribe({
        next: (response: Bond) => {
          console.log('Bono agregado:', response);
          this.loadBonds();
          this.bondFormData = { nombre: '', tasa: 0, plazo: 0, monto: 0 };
        },
        error: (err) => console.error('Error adding bond:', err)
      });
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/inicio']);
  }

  navigateToResults(bondId: string): void {
    this.router.navigate(['/results', bondId]);
  }

  deleteBond(bondId: string) {
    this.bondsService.deleteBond(bondId).subscribe({
      next: () => {
        this.valoraciones = this.valoraciones.filter(bond => bond.id !== bondId);
      },
      error: (err) => console.error('Error deleting bond:', err)
    });
  }
}