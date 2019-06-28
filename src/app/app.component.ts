import { Component, OnInit } from '@angular/core';

import { AuthService } from './_service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kendoui';

  isLogged: boolean;
  isLogin: boolean;
  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.isLogin = true;
    this.auth.isLogged.subscribe(record => {
      this.isLogged = record;
    });
  }

  onToggleEventLoginAndRegister(e) {
    e.preventDefault();
    this.isLogin = !this.isLogin;
  }

}
