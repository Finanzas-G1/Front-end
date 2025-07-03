import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bond } from '../bonds/bond.model'; // Asegúrate de crear esta interfaz

@Injectable({
  providedIn: 'root'
})
export class BondsService {
  private apiUrl = 'http://localhost:3000/bonds';

  constructor(private http: HttpClient) { }

  // Método para obtener un bono específico
  getBond(bondId: string): Observable<Bond> {
    return this.http.get<Bond>(`${this.apiUrl}/${bondId}`);
  }

  // Método para agregar un bono
  addBond(bond: Bond): Observable<Bond> {
    return this.http.post<Bond>(this.apiUrl, bond);
  }

  // Método para obtener bonos por usuario
  getBondsByUser(usuarioId: string): Observable<Bond[]> {
    return this.http.get<Bond[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  // Método para eliminar un bono
  deleteBond(bondId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bondId}`);
  }
}