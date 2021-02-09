import { Component, OnInit } from '@angular/core';
//import { EmpoloyeeServiceService } from '../empoloyee-service.service'
import { Observable } from 'rxjs';
import { LogData } from '../store/model/model';
import { Appstate } from '../store/model/appState';
import {Store} from '@ngrx/store'
import { LoadLogDataAction } from '../store/actions/actions';
@Component({
  selector: 'app-covid-log-data',
  templateUrl: './covid-log-data.component.html',
  styleUrls: ['./covid-log-data.component.css']
})
export class CovidLogDataComponent implements OnInit {
  loadingLogData:Observable<Array<LogData>>;
  loading:Observable<Boolean>;
  error:Observable<Error>;
  newloadLogData:LogData;
  constructor(private store:Store<Appstate>){}
  
  ngOnInit(): void {
    this.store.dispatch(new LoadLogDataAction());
    this.loadingLogData = this.store.select(store => store.loadLogData.list);
    this.loading = this.store.select(store => store.loadLogData.loading);
    this.error = this. store.select(store => store.loadLogData.error);
  }
  
}
