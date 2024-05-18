import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "../../dto/Credentials";
import {Observable} from "rxjs";
import {TokenDTO} from "../../dto/TokenDTO";
import {RegisterData} from "../../dto/RegisterData";
import {HotelDTO} from "../../dto/HotelDTO";
import {GetHotels} from "../../dto/GetHotels";
import {BookingDTO} from "../../dto/BookingDTO";
import {ReviewDTO} from "../../dto/ReviewDTO";

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private baseUrl = environment.apiUrl+"/hotel";
  constructor(private http: HttpClient) { }

  getHotels(hotelValues: GetHotels): Observable<HotelDTO[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.post<HotelDTO[]>(`${this.baseUrl}/get-hotels`, hotelValues,{headers});
  }

  cancelBooking(roomNumber: number,hotelId: number,email: string):Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    let bookingDTO = new BookingDTO();
    bookingDTO.email = email;
    bookingDTO.hotelId = hotelId;
    bookingDTO.roomNumber = roomNumber;
    return this.http.post<void>(`${this.baseUrl}/cancel-booking`, bookingDTO,{headers});
  }

  book(roomNumber: number,hotelId: number,email: string,time: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    if(typeof time === 'undefined' || time === null) {
      console.error("time is a required parameter");
      return;
    }
    let bookingDTO = new BookingDTO();
    bookingDTO.email = email;
    bookingDTO.hotelId = hotelId;
    bookingDTO.roomNumber = roomNumber;
    bookingDTO.time = time;
    this.http.post(`${this.baseUrl}/booking`, bookingDTO,{headers}).subscribe(
      response => {
      },
      error => {
        console.error(error);
      }
    );
  }

  submitReview(roomNumber: number,hotelId: number,email: string,reviewS: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });

    let review = new ReviewDTO();
    review.email = email;
    review.hotelId = hotelId;
    review.roomNumber = roomNumber;
    review.review = reviewS;
    this.http.post(`${this.baseUrl}/review`, review,{headers}).subscribe(
      response => {
      },
      error => {
        console.error(error);
      }
    );
  }

}
