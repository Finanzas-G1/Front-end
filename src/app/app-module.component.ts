import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { LoginModule } from './modules/login/login.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './modules/register/presentation/register.component';
import {LoginComponent} from './modules/login/presentation/login.component';
import { DashboardComponent } from './modules/dashboard/presentation/dashboard/dashboard.component';
import { BondsComponent } from './modules/bonds/presentation/bonds/bonds.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LoginModule,
    HttpClientModule,
    LoginComponent,
    RegisterComponent,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DashboardComponent,
    BondsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
