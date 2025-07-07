import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BondsService {

  private apiUrl = 'http://localhost:3000/bonds';

  constructor(private http: HttpClient) { }

  // Método para agregar un bono
  addBond(bond: any): Observable<any> {
    return this.http.post(this.apiUrl, bond);
  }

  // Método para obtener bonos por usuario
  getBondsByUser(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  // Método para eliminar un bono
  deleteBond(bondId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bondId}`);
  }

  // Método para actualizar un bono
  updateBond(bondId: string, bond: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bondId}`, bond);
  }
}
