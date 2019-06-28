import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RefreshToken } from 'src/app/_helpers/refresh-token';

@Component({
  selector: 'user-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private refreshToken: RefreshToken
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  onSubmit() {
    this.userService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list']);
      },
      reject => {
        this.refreshToken.refresh(reject);
      }
      );
  }

}
