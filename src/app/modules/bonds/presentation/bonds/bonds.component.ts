import { Component, OnInit } from '@angular/core';
import { BondsService } from '../services/bonds.service';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ConfigService } from '../../../config/services/config.service';
import { Bond } from '../../../results/presentation/results.service';

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
  bondFormData: Bond = {
    nombre: '',
    valorNominal: 0,
    tasa: 0,
    fechaEmision: '',
    fechaVencimiento: '',
    usuarioId: '',
    plazo: 0,
    interestType: '',
    gracePeriod: '',
    capitalization: ''
  };

  valoraciones: Bond[] = [];
  displayedColumns: string[] = ['nombre', 'valorNominal', 'tasa', 'plazo', 'capitalization', 'gracePeriod', 'interestType', 'acciones'];
  usuarioId: string = localStorage.getItem('usuarioId') || '';
  editMode: boolean = false;
  selectedBondId: string = '';

  constructor(
    private bondsService: BondsService,
    private router: Router,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    if (this.usuarioId) {
      this.loadBonds();
      this.loadUserConfig();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadBonds() {
    this.bondsService.getBondsByUser(this.usuarioId).subscribe(response => {
      this.valoraciones = response;
    });
  }

  loadUserConfig() {
    this.configService.getConfig(this.usuarioId).subscribe((config: any) => {
      if (config) {
        this.bondFormData.interestType = config.interestType;
        this.bondFormData.gracePeriod = config.gracePeriod;
        this.bondFormData.capitalization = config.capitalization;
      }
    });
  }

  calculatePlazo() {
    const start = new Date(this.bondFormData.fechaEmision);
    const end = new Date(this.bondFormData.fechaVencimiento);
    this.bondFormData.plazo = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 365));
  }

  editBond(bondId: string) {
    const bondToEdit = this.valoraciones.find(bond => bond.id === bondId);
    if (bondToEdit) {
      this.selectedBondId = bondId;
      this.bondFormData = { ...bondToEdit };
      this.editMode = true;
      
      if (this.bondFormData.interestType === 'Efectiva') {
        this.bondFormData.capitalization = '';
      }
    }
  }

  onSubmit() {
    if (this.bondFormData.nombre && this.bondFormData.valorNominal && 
        this.bondFormData.fechaEmision && this.bondFormData.fechaVencimiento && 
        this.bondFormData.tasa) {
      
      this.calculatePlazo();
      this.bondFormData.usuarioId = this.usuarioId;

      if (this.editMode) {
        this.bondsService.updateBond(this.selectedBondId, this.bondFormData).subscribe({
          next: () => {
            this.loadBonds();
            this.resetForm();
          },
          error: (err) => console.error('Error updating bond:', err)
        });
      } else {
        this.bondsService.addBond(this.bondFormData).subscribe({
          next: () => {
            this.loadBonds();
            this.resetForm();
          },
          error: (err) => console.error('Error adding bond:', err)
        });
      }
    }
  }

  resetForm() {
    this.bondFormData = {
      nombre: '',
      valorNominal: 0,
      tasa: 0,
      fechaEmision: '',
      fechaVencimiento: '',
      usuarioId: this.usuarioId,
      plazo: 0,
      interestType: this.bondFormData.interestType,
      gracePeriod: this.bondFormData.gracePeriod,
      capitalization: this.bondFormData.capitalization
    };
    this.editMode = false;
    this.selectedBondId = '';
  }

  navigateToHome(): void {
    this.router.navigate(['/inicio']);
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