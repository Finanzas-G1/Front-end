import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BondsService } from '../../bonds/presentation/services/bonds.service';
import { ResultsService } from './results.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Bond } from '../../bonds/presentation/bonds/bond.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    NgxChartsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatIconModule
  ]
})
export class ResultsComponent implements OnInit {
  bondId: string = '';
  bond: Bond | null = null;
  results: any = null;
  
  // Datos para gráficos
  flujoCajaChart: any[] = [];
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF8C00']
  };

  // Columnas para tablas
  displayedColumnsFlujo = ['year', 'interes', 'capital', 'total'];
  displayedColumnsMetrics = ['metric', 'value', 'description'];

  constructor(
    private route: ActivatedRoute,
    private bondsService: BondsService,
    private resultsService: ResultsService
  ) {}

  ngOnInit(): void {
    this.bondId = this.route.snapshot.paramMap.get('id') || '';
    if (this.bondId) {
      this.loadBondData();
    }
  }

  loadBondData(): void {
    this.bondsService.getBond(this.bondId).subscribe({
      next: (bond: Bond) => {
        this.bond = bond;
        this.results = this.resultsService.calculateMetrics(bond);
        this.prepareChartData();
      },
      error: (err) => console.error('Error loading bond:', err)
    });
  }

  prepareChartData(): void {
    if (this.results?.flujoCaja) {
      this.flujoCajaChart = this.results.flujoCaja.map((item: any) => ({
        name: `Año ${item.year}`,
        value: item.value + (item.final || 0)
      }));
    }
  }

  // Método para formatear moneda (reemplazo para CurrencyPipe)
  formatCurrency(value: number): string {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  // Método para formatear porcentaje (reemplazo para PercentPipe)
  formatPercent(value: number): string {
    return (value * 100).toFixed(2) + '%';
  }
}