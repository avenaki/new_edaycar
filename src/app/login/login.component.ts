import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      login: new FormControl("Username", [Validators.required,  Validators.minLength(4), Validators.pattern("^[A-Za-z0-9]+$")]),
      password: new FormControl("Password", [Validators.required, Validators.minLength(8),
      ])
    });
  }

  login(): void {
    this.http.login(this.loginForm.controls["username"].value, btoa(this.loginForm.controls["password"].value)).subscribe();
  }
}

