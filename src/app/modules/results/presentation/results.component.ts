import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BondsService } from '../../bonds/presentation/services/bonds.service';
import { ResultsService, Bond, BondResults } from './results.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    NgxChartsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class ResultsComponent implements OnInit {
  bonds: Bond[] = [];
  selectedBondId: string | null = null;
  bond: Bond | null = null;
  results: BondResults | null = null;
  flujoCajaChart: any[] = [];
  currency: string | null = null;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF8C00', '#FFA500', '#FF6A00']
  };

  displayedColumnsFlujo = ['periodo', 'year', 'interes', 'capital', 'total'];

  constructor(
    private bondsService: BondsService,
    private resultsService: ResultsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBonds(usuarioId);
  }

  loadBonds(usuarioId: string): void {
    this.bondsService.getBondsByUser(usuarioId).subscribe({
      next: (bonds) => {
        this.bonds = bonds;
        if (bonds.length > 0) {
          this.selectedBondId = bonds[0].id || null;
          this.loadBondData(this.selectedBondId);
        }
      },
      error: (err) => console.error('Error loading bonds:', err)
    });
  }

  loadBondData(bondId: string | null): void {
    if (!bondId) return;

    const selectedBond = this.bonds.find(b => b.id === bondId);
    if (!selectedBond) return;

    this.bond = selectedBond;
    this.results = this.resultsService.calculateMetrics(selectedBond);
    this.prepareChartData();
  }

  onBondSelectionChange(): void {
    this.loadBondData(this.selectedBondId);
  }

  prepareChartData(): void {
    if (this.results?.flujoCaja) {
      this.flujoCajaChart = this.results.flujoCaja.map(item => ({
        name: `Período ${item.periodo}`,
        value: item.value + (item.final || 0)
      }));
    }
  }

  // Función para determinar el símbolo de la moneda
  getCurrencySymbol(): string {
    return this.currency === 'PEN' ? 'S/.' : (this.currency === 'USD' ? '$' : '');
  }

  navigateToHome(): void {
    this.router.navigate(['/inicio']);
  }
}
