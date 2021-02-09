import { Component, OnInit } from '@angular/core';
import { EmpoloyeeServiceService } from '../empoloyee-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  covid19Data: any;
  errorMessage: any;
  chartdata: number[] = [];
  constructor(private _covid19DataGetUrl: EmpoloyeeServiceService) { }
  

  processData(data: any) {
    let country: any = {};
    country.states = [];
    country.countryActive = 0;
    country.countryCofirmed = 0;
    country.counntryDeceased = 0;
    country.countryRecovered = 0;

    for (let state in data) {
      let temp: any = {};
      temp.state = state;
      temp.data = [];
      temp.active = 0;
      temp.confirmed = 0;
      temp.deceased = 0;
      temp.recovered = 0;

      for (let disctrict in data[state].districtData) {
        let tempDis: any = {};
        tempDis.disctrict = disctrict;
        tempDis.data = data[state].districtData[disctrict];
        temp.active = temp.active + tempDis.data.active;
        temp.confirmed = temp.confirmed + tempDis.data.confirmed;
        temp.deceased = temp.deceased + tempDis.data.deceased;
        temp.recovered = temp.recovered + tempDis.data.recovered;
        temp.data.push(tempDis);
      }
      country.countryActive = country.countryActive + temp.active;
      country.countryCofirmed = country.countryCofirmed + temp.confirmed;
      country.countryRecovered = country.countryRecovered + temp.recovered;
      country.counntryDeceased = country.counntryDeceased + temp.deceased;
      country.states.push(temp);
    }
    return country;
  }

  getcovid19Data() {
    this._covid19DataGetUrl.getcovid19Data().subscribe((data) => {
      this.covid19Data =this.processData(data);
    },
      (error) => { this.errorMessage = error });
  }

  
  

  ngOnInit(): void {
    this.getcovid19Data();
  }
}
