import { AuthService } from './../../_service/auth.service';
import { User } from './../../_model/user';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { RefreshToken } from 'src/app/_helpers/refresh-token';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  users: any;
  userSubscription: Subscription;
  refreshTokenSubscription: Subscription;

  constructor(
    private router: Router, 
    private userService: UserService,
    private auth: AuthService,
    private refreshToken: RefreshToken
    ) { }

  ngOnInit() {
    if(!window.sessionStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.userSubscription = this.userService.getUsers()
      .subscribe( data => {
        console.log(data)
        this.users = data;
      }, reject => {
        this.refreshToken.refresh(reject);
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    window.sessionStorage.removeItem("editUserId");
    window.sessionStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['/edit', user.id.toString()]);
  };

  addUser(): void {
    this.router.navigate(['/add']);
  };

  ngOnDestroy() {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if(this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }
  }

}
