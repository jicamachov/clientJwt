import { User } from './../../_model/user';
import { AuthService } from './../../_service/auth.service';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { reject } from 'q';
import { RefreshToken } from 'src/app/_helpers/refresh-token';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  user: User;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private auth: AuthService,
    private activatedRouter: ActivatedRoute,
    private refreshToken: RefreshToken
  ) { }

  ngOnInit() {
    //let userId = window.sessionStorage.getItem("editUserId");
    let userId = this.activatedRouter.snapshot.params.id; 
    console.log(userId);
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });

    this.userService.getUserById(userId)
    .subscribe( data => {
      console.log('data->, ', data);
      this.editForm.setValue(data);
    });
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .subscribe(
        data => {
            alert('User updated successfully.');
            this.router.navigate(['list-user']);
        },
        reject => {
          this.refreshToken.refresh(reject);

        });
  }

}
