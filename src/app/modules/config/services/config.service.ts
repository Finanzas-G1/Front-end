import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private apiUrl = 'https://json-squema.onrender.com/config';  // URL de la API

  constructor(private http: HttpClient) { }

  // Método para obtener la configuración de un usuario
  getConfig(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Método para actualizar la configuración de un usuario
  updateConfig(userId: string, config: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, config);
  }
}
