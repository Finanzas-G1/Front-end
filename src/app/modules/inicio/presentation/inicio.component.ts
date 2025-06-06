import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  imports: [

  ],
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.username = user.username;
    }
  }
}
