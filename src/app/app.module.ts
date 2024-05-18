import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInRegisterComponent } from './components/log-in-register/log-in-register.component';
import {FormsModule} from "@angular/forms";
import {JwtModule} from "@auth0/angular-jwt";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import {GeolocationService} from "../service/GeolocationService/geolocation.service";
import { MainPageComponent } from './components/main-page/main-page.component';
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";

@NgModule({
  declarations: [
    AppComponent,
    LogInRegisterComponent,
    NavbarComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMaterialTimepickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => sessionStorage.getItem('token')
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
