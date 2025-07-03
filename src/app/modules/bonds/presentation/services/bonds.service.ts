import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BondsService {

  private apiUrl = 'http://localhost:3000/bonds'; // Asegúrate de que esta URL coincida con tu JSON Server

  constructor(private http: HttpClient) { }

  // Método para agregar un bono
  addBond(bond: any): Observable<any> {
    return this.http.post(this.apiUrl, bond);
  }

  // bonds.service.ts
  getBondsByUser(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  // Método para eliminar un bono
  deleteBond(bondId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bondId}`);
  }
}
