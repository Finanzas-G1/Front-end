import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './presentation/login.component';
import { LoginService } from './application/login.service';
import { AuthRepository } from './infrastructure/auth.repository';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginComponent
  ],
  providers: [LoginService, AuthRepository]
})
export class LoginModule {}
