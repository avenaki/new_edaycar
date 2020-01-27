import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      login: new FormControl("username", [Validators.required,  Validators.minLength(6), Validators.pattern("^[A-Za-z0-9]+$")]),
      password: new FormControl("password", [Validators.required, Validators.minLength(8),
      ])
    });
  }

  }

