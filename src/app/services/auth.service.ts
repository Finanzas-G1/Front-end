import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user = this.userSubject.asObservable();

  constructor() { }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }
  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('user');  // Elimina los datos del usuario del almacenamiento local
  }
}
