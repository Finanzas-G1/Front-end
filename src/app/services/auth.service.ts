import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Inicialmente null
  public user = this.userSubject.asObservable(); // Observable para suscribirse a cambios de usuario

  constructor() { }

  setUser(user: any) {
    this.userSubject.next(user);  // Almacena al usuario autenticado
  }

  getUser() {
    return this.userSubject.value;  // Obtiene el usuario actual
  }
}
