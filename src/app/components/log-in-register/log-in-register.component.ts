import {Component, OnInit} from '@angular/core';
import {Credentials} from "../../../dto/Credentials";
import {RegisterData} from "../../../dto/RegisterData";
import {UserService} from "../../../service/UserService/user.service";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in-register',
  templateUrl: './log-in-register.component.html',
  styleUrls: ['./log-in-register.component.css']
})
export class LogInRegisterComponent {

  logInForm: boolean = true;
  credentials: Credentials = new Credentials();
  registerData: RegisterData = new RegisterData();
  constructor(private userService: UserService,private router: Router) {
    this.credentials.email = "";
    this.credentials.password = "";
    this.registerData.email = "";
    this.registerData.password = "";
    this.registerData.name = "";
  }

  changeLogInForm(logInForm: boolean) {
    this.logInForm = logInForm;
  }

  async logIn() {
    try {
      const success = await firstValueFrom(this.userService.logIn(this.credentials));
      sessionStorage.setItem('token', success.token);
      this.router.navigate(['/main'])
    } catch (error) {
      // @ts-ignore
      const errorMessage = error?.error?.message || 'Unknown error occurred';
      console.error(errorMessage)
    }
  }
  async register() {
    try {
      const success = await firstValueFrom(this.userService.register(this.registerData));
      sessionStorage.setItem('token', success.token);
      this.router.navigate(['/main']);
    } catch (error) {
      console.error(error);
    }
  }

}
