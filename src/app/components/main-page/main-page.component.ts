import { Component } from '@angular/core';
import {HotelDTO} from "../../../dto/HotelDTO";
import {RoomDTO} from "../../../dto/RoomDTO";
import {HotelService} from "../../../service/HotelService/hotel.service";
import {TokenService} from "../../../service/TokenService/token.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(private hotelService: HotelService,private tokenService: TokenService) {
    this.expandedHotelId = -1;
    this.selectedRoom = -1;
  }

  selectedTime!: string;
  hotels: HotelDTO[] = [];
  expandedHotelId!: number;
  isTextBoxVisible: boolean = false;
  selectedRoom!: number;
  reviews!: string;

  onHotelsLoaded(hotels: HotelDTO[]): void {
    this.hotels = hotels;
  }

  toggleExpand(hotelId: number): void {
    if (this.expandedHotelId === hotelId) {
      this.expandedHotelId = -1;
    }else
    this.expandedHotelId = hotelId;
  }

  submitReview(room: number,hotelId: number) {
    const decoded = this.tokenService.decode();
    this.hotelService.submitReview(room,hotelId,decoded.sub,this.reviews);
    this.reviews = '';
    this.isTextBoxVisible = false;
    this.selectedRoom = -1;
  }
  bookRoom(room: number,hotelId: number) {
    const decoded = this.tokenService.decode();
    this.hotelService.book(room,hotelId,decoded.sub,this.selectedTime);
  }
  async cancelBooking(room: number,hotelId: number) {
    try {
      const decoded = this.tokenService.decode();
      const success = await firstValueFrom(this.hotelService.cancelBooking(room,hotelId,decoded.sub));
    } catch (error) {
      // @ts-ignore
      const errorMessage = error?.error?.message || 'Unknown error occurred';
      console.error(errorMessage)
    }
  }
  leaveReview(room: number): void {
    if(this.selectedRoom === room) {
      this.isTextBoxVisible = !this.isTextBoxVisible;
    }else{
      this.selectedRoom = room;
      this.isTextBoxVisible = true;
    }
  }

}
