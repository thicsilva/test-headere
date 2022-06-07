import { Component, OnInit } from '@angular/core';
import { Weather } from './models/weather';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
   weather = {} as Weather;
   weathers: Weather[] = [];

   constructor (private weatherService: WeatherService){}
  ngOnInit(): void {
    this.getWeathers();
  }
  getWeathers() {
    this.weatherService.getWeathers().subscribe((weathers: Weather[])=>{
      this.weathers = weathers;
    });
  }

  getWeather(temperature:number) {
    this.weatherService.getWeatherByTemperature(temperature).subscribe((weather: Weather)=>{
      this.weather = weather;
    });
  }
  title = 'app-angular';
}
