import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/presentation/login.component';
import { RegisterComponent } from './modules/register/presentation/register.component';
import { InicioComponent } from './modules/inicio/presentation/inicio.component';
import { DashboardComponent } from './modules/dashboard/presentation/dashboard/dashboard.component';
import { BondsComponent } from './modules/bonds/presentation/bonds/bonds.component';
import { ResultsComponent } from './modules/results/presentation/results.component';
import {ConfigComponent} from './modules/config/presentation/config.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bonds', component: BondsComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'results', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
