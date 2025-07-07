import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bond {
  id?: string;
  nombre: string;
  valorNominal: number;
  tasa: number;
  fechaEmision: string;
  fechaVencimiento: string;
  plazo?: number;
  usuarioId: string;
  capitalization?: string;
  interestType?: string;
  gracePeriod?: string;
  frecuenciaPagos?: number;
}

export interface BondResults {
  tcea: number;
  trea: number;
  precioMax: number;
  convexidad: string;
  duracion: string;
  duracionModificada: string;
  flujoCaja: any[];
  riesgo: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = 'http://localhost:3000/bonds';

  constructor(private http: HttpClient) { }

  getBondResults(bondId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${bondId}/results`);
  }

  calculateMetrics(bond: Bond): BondResults {
    const plazo = bond.plazo || this.calculatePlazo(bond.fechaEmision, bond.fechaVencimiento);
    const tasa = bond.tasa / 100;
    const valorNominal = bond.valorNominal;
    const frecuencia = bond.frecuenciaPagos || 1;
    
    const flujoCaja = this.calculateFlujoCaja(valorNominal, tasa, plazo, frecuencia);

    return {
      nombre: bond.nombre,
      tcea: this.calculateTCEA(tasa, frecuencia),
      trea: this.calculateTREA(tasa, frecuencia),
      precioMax: this.calculatePrecioMaximo(valorNominal, tasa, plazo, frecuencia),
      convexidad: this.calculateConvexidad(plazo, tasa),
      duracion: plazo.toFixed(2),
      duracionModificada: this.calculateDuracionModificada(tasa, plazo).toFixed(2),
      flujoCaja,
      riesgo: this.determinarRiesgo(tasa)
    };
  }

  private calculateFlujoCaja(valorNominal: number, tasa: number, plazo: number, frecuencia: number): any[] {
    const flujos = [];
    const pagoPeriodico = (valorNominal * tasa) / frecuencia;
    
    for (let i = 1; i <= plazo * frecuencia; i++) {
      const final = i === plazo * frecuencia ? valorNominal : 0;
      flujos.push({
        periodo: i,
        year: Math.ceil(i / frecuencia),
        value: pagoPeriodico,
        final
      });
    }
    return flujos;
  }

  private calculatePlazo(fechaEmision: string, fechaVencimiento: string): number {
    const start = new Date(fechaEmision);
    const end = new Date(fechaVencimiento);
    return (end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 365);
  }

  private calculateTCEA(tasa: number, frecuencia: number): number {
    return Math.pow(1 + (tasa / frecuencia), frecuencia) - 1;
  }

  private calculateTREA(tasa: number, frecuencia: number): number {
    return this.calculateTCEA(tasa, frecuencia) * 0.95; // Ajuste por costos
  }

  private calculatePrecioMaximo(valorNominal: number, tasa: number, plazo: number, frecuencia: number): number {
    let precio = 0;
    const flujo = this.calculateFlujoCaja(valorNominal, tasa, plazo, frecuencia);
    
    flujo.forEach(item => {
      precio += (item.value + item.final) / Math.pow(1 + tasa, item.periodo / frecuencia);
    });
    
    return precio;
  }

  private calculateConvexidad(plazo: number, tasa: number): string {
    return (plazo * plazo / (1 + tasa)).toFixed(4);
  }

  private calculateDuracionModificada(tasa: number, duracion: number): number {
    return duracion / (1 + tasa);
  }

  private determinarRiesgo(tasa: number): string {
    return tasa > 0.1 ? 'ALTO' : tasa > 0.05 ? 'MEDIO' : 'BAJO';
  }
}