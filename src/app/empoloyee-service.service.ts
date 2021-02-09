import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmpoloyeeServiceService {

  constructor(private _http: HttpClient, private _url: HttpClient) { }

  getcovid19Data(): Observable<any> {
    return this._url.get<any>("/getCovidData")
  
      .pipe(catchError(this.errorHandlerCovid19Data));
  }
  errorHandlerCovid19Data(error: HttpErrorResponse) {
    return throwError(error.message || "Server Not Found")
  }

  getCovidFullData(): Observable<any> {
    return this._url.get<any>("/getCovidFullData", {
    })
      .pipe(catchError(this.errorHandlerCovidFullData));
  }
  errorHandlerCovidFullData(error: HttpErrorResponse) {
    return throwError(error.message || "Server Not Found")
  }

}
