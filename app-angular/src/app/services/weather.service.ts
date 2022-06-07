import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url = 'https://localhost:5001/WeatherForecast';

  constructor(private httpClient: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getWeathers(): Observable<Weather[]> {
    this.httpClient.get<Weather[]>(this.url, {observe: "response"})
    .subscribe((response)=>{console.log(response.headers.get('x-person-token'))})
    return this.httpClient.get<Weather[]>(this.url )
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getWeatherByTemperature(temperature: number): Observable<Weather> {
    return this.httpClient.get<Weather>(this.url + `/${temperature}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
