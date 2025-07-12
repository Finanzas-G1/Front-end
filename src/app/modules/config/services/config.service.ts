import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config {
  currency: string;
  interestType: string;
  capitalization: string;
  gracePeriod: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = 'https://json-squema.onrender.com/config';  // URL de tu API

  constructor(private http: HttpClient) { }

  /** GET: obtiene la configuración del usuario */
  getConfig(userId: string): Observable<Config> {
    return this.http.get<Config>(`${this.apiUrl}/${userId}`);
  }

  /** PUT: actualiza la configuración del usuario */
  updateConfig(userId: string, config: Config): Observable<Config> {
    return this.http.put<Config>(`${this.apiUrl}/${userId}`, config);
  }
}
