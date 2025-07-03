import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = 'http://localhost:3000/bonds';

  constructor(private http: HttpClient) { }

  getBondResults(bondId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${bondId}/results`);
  }

  calculateMetrics(bond: any): any {
    // Cálculos simulados - en una app real estos vendrían del backend
    const plazo = bond.plazo;
    const tasa = bond.tasa / 100;
    const monto = bond.monto;
    
    // Cálculos simplificados
    const flujoCaja = Array.from({length: plazo}, (_, i) => ({
      year: i + 1,
      value: monto * tasa,
      final: i === plazo - 1 ? monto : 0
    }));

    return {
      tcea: (tasa * 1.1).toFixed(4), // TCEA simulada
      trea: (tasa * 0.95).toFixed(4), // TREA simulada
      precioMax: monto * 1.05,
      convexidad: (plazo * plazo).toFixed(2),
      duracion: plazo.toFixed(1),
      flujoCaja,
      riesgo: tasa > 0.1 ? 'ALTO' : 'MODERADO'
    };
  }
}