import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {Credentials} from "../../dto/Credentials";
import {RegisterData} from "../../dto/RegisterData";
import {Observable} from "rxjs";
import {TokenDTO} from "../../dto/TokenDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl+"/user";
  constructor(private http: HttpClient) { }

  logIn(credentials: Credentials): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(`${this.baseUrl}/login`, credentials);
  }
  register(credentials: RegisterData): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(`${this.baseUrl}/register`, credentials);
  }

}
