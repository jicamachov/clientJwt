import { AuthService } from './../_service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.auth.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      console.log(window.sessionStorage.getItem('token'));
      this.router.navigate(['/list']);
    }, error => {
        alert(error.error.error_description)
    });
  }

}
