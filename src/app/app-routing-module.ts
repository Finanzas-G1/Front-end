import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/presentation/login.component';
import { RegisterComponent } from './modules/register/presentation/register.component';
import { InicioComponent } from './modules/inicio/presentation/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Página de login por defecto
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'register', component: RegisterComponent },  // Ruta para el registro
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
