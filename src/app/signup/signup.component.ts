import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.initForm();
  }
private initForm(): void {
  this.signUpForm = this.fb.group({
    name: new FormControl("Имя",[Validators.required,  Validators.minLength(3)]),
    surname: new FormControl("Фамилия",[Validators.required,  Validators.minLength(3)]),
    patronymic: new FormControl("Отчество",[Validators.required,  Validators.minLength(3)]),
    birthdate: new FormControl("",[Validators.required]),
    mobileNumber: new FormControl("",[Validators.required]),
    login: new FormControl("username", [Validators.required,  Validators.minLength(6), Validators.pattern("^[A-Za-z0-9]+$")]),
    password: new FormControl("password", [Validators.required, Validators.minLength(8),
    ])
  });
}
}
