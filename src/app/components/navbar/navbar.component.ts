import {Component, EventEmitter, Output} from '@angular/core';
import {GeolocationService} from "../../../service/GeolocationService/geolocation.service";
import {GetHotels} from "../../../dto/GetHotels";
import {HotelService} from "../../../service/HotelService/hotel.service";
import {HotelDTO} from "../../../dto/HotelDTO";
import {TokenService} from "../../../service/TokenService/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private geolocationService: GeolocationService,
              private hotelService: HotelService,
              private tokenService: TokenService,
              private router:Router) { }

  getHotels: GetHotels = new GetHotels();
  @Output() hotelsLoaded = new EventEmitter<HotelDTO[]>();

  search() {
    // @ts-ignore
    this.geolocationService.getCurrentPosition()
      .then(position => {
        this.getHotels.latitude = position.coords.latitude;
        this.getHotels.longitude = position.coords.longitude;
        const decoded = this.tokenService.decode();
        this.getHotels.email = decoded.sub;
        this.hotelService.getHotels(this.getHotels).subscribe(hotels => {
          this.hotelsLoaded.emit(hotels);
        },
  error => {
          console.error("error");
  })
      })
      .catch(error => {
        console.error(error);
      });
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
