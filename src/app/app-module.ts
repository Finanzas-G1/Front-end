import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { LoginModule } from './modules/login/login.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './modules/register/presentation/register.component';
import {LoginComponent} from './modules/login/presentation/login.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, RouterModule, LoginModule, HttpClientModule, LoginComponent, RegisterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
