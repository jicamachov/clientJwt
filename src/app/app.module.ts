import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { DetailComponent } from './user/detail/detail.component';
import { AddComponent } from './user/add/add.component';
import { EditComponent } from './user/edit/edit.component';
import { ListComponent } from './user/list/list.component';
import { LoginComponent } from './login/login.component';

import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    DetailComponent,
    AddComponent,
    EditComponent,
    ListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
