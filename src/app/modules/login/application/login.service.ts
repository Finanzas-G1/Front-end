import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://json-squema.onrender.com/users';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) => {
        const user = data.find(
          (user: any) => user.username === username && user.password === password
        );
        if (user) {
          console.log('Usuario encontrado:', user);
          return {success: true, user};
        } else {
          console.error('Credenciales incorrectas');
          return {success: false, message: 'Credenciales incorrectas'};
        }
      }),
      catchError((error) => {
        console.error('Error al realizar la solicitud:', error);
        return of({success: false, message: 'Error al realizar la solicitud'});
      })
    );
  }
}
