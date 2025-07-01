import { Component, OnInit } from '@angular/core';
import { BondsService } from '../../../bonds/presentation/services/bonds.service';
import { Router } from '@angular/router';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';  // Importar ScaleType
import { Color } from '@swimlane/ngx-charts';  // Asegúrate de importar el tipo Color

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    MatIcon,
    PercentPipe,
    CurrencyPipe,
    MatButton,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    NgxChartsModule,
    MatCard
  ]
})
export class DashboardComponent implements OnInit {
  totalBonos: number = 0;
  promedioTasa: number = 0;
  totalMonto: number = 0;
  graficoTasas: any[] = []; // Datos para el gráfico

  // Aquí definimos el colorScheme correctamente como un tipo 'Color'
  colorScheme: Color = {
    name: 'coolcolors',  // Nombre del esquema de colores
    selectable: true,     // Si el esquema es seleccionable
    group: ScaleType.Ordinal,  // Usar ScaleType.Ordinal
    domain: ['#FF6A00', '#FF8C00', '#FF9E00']  // Los colores de las barras
  };

  constructor(private bondsService: BondsService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    const usuarioId = localStorage.getItem('usuarioId') || '';
    this.bondsService.getBondsByUser(usuarioId).subscribe((bonos: any[]) => {
      this.totalBonos = bonos.length;
      this.totalMonto = bonos.reduce((acc, bond) => acc + bond.monto, 0);
      this.promedioTasa = bonos.reduce((acc, bond) => acc + bond.tasa, 0) / this.totalBonos;

      // Preparar los datos para el gráfico de barras
      this.graficoTasas = bonos.map((bond) => ({
        name: bond.nombre,
        value: bond.tasa
      }));
    });
  }

  navigateToBonds() {
    this.router.navigate(['/bonds']);
  }

  navigateToResults() {
    this.router.navigate(['/results']);
  }
}
