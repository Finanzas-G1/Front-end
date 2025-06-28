import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {DashboardComponent} from '../../dashboard/presentation/dashboard/dashboard.component';
import {MatButton} from '@angular/material/button';  // Importar Router para navegación

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  imports: [
    NgOptimizedImage,
    DashboardComponent,
    MatButton
  ],
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  username: string = '';

  constructor(
    private authService: AuthService,
    private router: Router  // Inyectar el router
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.username = user.username;
    }
  }

  // Método para navegar a la vista Config
  navigateToConfig(): void {
    this.router.navigate(['/config']);
  }

  // Método para navegar a la vista Bonds
  navigateToBonds(): void {
    this.router.navigate(['/bonds']);
  }

  // Método para navegar a la vista Results
  navigateToResults(): void {
    this.router.navigate(['/results']);
  }

  // Método para cerrar sesión y redirigir al Login
  logOut(): void {
    this.authService.logout();  // Llamamos a un método para cerrar sesión en el servicio
    this.router.navigate(['/login']);  // Redirigir a Login
  }
}
