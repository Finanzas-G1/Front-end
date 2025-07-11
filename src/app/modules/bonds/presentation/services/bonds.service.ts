import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bond } from '../../../results/presentation/results.service';

@Injectable({
  providedIn: 'root'
})
export class BondsService {
  private apiUrl = 'https://json-squema.onrender.com/bonds';

  constructor(private http: HttpClient) { }

  addBond(bond: Bond): Observable<Bond> {
    return this.http.post<Bond>(this.apiUrl, bond);
  }

  getBondsByUser(usuarioId: string): Observable<Bond[]> {
    return this.http.get<Bond[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  deleteBond(bondId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bondId}`);
  }

  updateBond(bondId: string, bond: Bond): Observable<Bond> {
    return this.http.put<Bond>(`${this.apiUrl}/${bondId}`, bond);
  }
}