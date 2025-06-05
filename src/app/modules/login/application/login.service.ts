// login.service.ts
import {Injectable} from '@angular/core';
import {AuthRepository} from '../infrastructure/auth.repository';
import {Observable} from 'rxjs';
import {User} from '../domain/user.entity';

@Injectable()
export class LoginService {
  constructor(private authRepo: AuthRepository) {}

  login(email: string, password: string): Observable<User> {
    return this.authRepo.login(email, password);
  }
}
