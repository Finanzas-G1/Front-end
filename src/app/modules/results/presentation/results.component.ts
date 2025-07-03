import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BondsService } from '../../bonds/presentation/services/bonds.service';
import { ResultsService } from './results.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

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
    MatIconModule,
    MatButton
  ]
})
export class ResultsComponent implements OnInit {
  bond: any = null;  // Aquí guardamos el bono
  results: any = null;  // Aquí guardamos los resultados calculados
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
    private resultsService: ResultsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioId = localStorage.getItem('usuarioId'); // Obtener usuarioId desde localStorage
    if (usuarioId) {
      this.loadBondData(usuarioId); // Cargar los bonos según el usuarioId
    }
  }

  loadBondData(usuarioId: string): void {
    // Obtener los bonos filtrados por usuarioId
    this.bondsService.getBondsByUser(usuarioId).subscribe({
      next: (bonds) => {
        if (bonds && bonds.length > 0) {
          this.bond = bonds[0]; // Seleccionamos el primer bono del usuario (puedes ajustar esto según lo necesites)
          this.results = this.resultsService.calculateMetrics(this.bond);  // Calcular las métricas del bono
          this.prepareChartData();
        } else {
          console.log('No se encontraron bonos para este usuario');
        }
      },
      error: (err) => console.error('Error loading bond data:', err)
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

  formatCurrency(value: number): string {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  formatPercent(value: number): string {
    return (value * 100).toFixed(2) + '%';
  }

  // Método para navegar a la página de Home
  navigateToHome(): void {
    this.router.navigate(['/inicio']);
  }
}
