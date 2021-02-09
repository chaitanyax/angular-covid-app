import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LogData } from './store/model/model'

@Injectable({
  providedIn: 'root'
})
export class Covid19LogDataService {

  constructor(private _url: HttpClient) { }
  getcovid19LogData(): Observable<any> {
    return this._url.get<LogData[]>("/getCovidLogs");
  }
}
