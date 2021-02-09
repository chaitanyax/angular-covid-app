import { Component, OnInit, Input } from '@angular/core';
import { EmpoloyeeServiceService } from '../empoloyee-service.service';
import { chartreuse } from 'color-name';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {
  // Start Of Doughnut 
  
  covid19ChartData: any;
  doughnutCharerrorMessage: any;
  chartData: any;
  public doughnutChartData: number[] = [];
  public doughnutChartLabels: string[] = ['Confirmed Cases', 'Active Cases', 'Recovered Cases', 'Deceased Cases'];
  public doughnutChartType: string = 'doughnut';
  public chartColors: Array<any> = [{ backgroundColor: ['#F44336', 'rgba(0,0,255,0.7)', 'rgba(0,255,0,0.6 )', 'rgba(0,0,0,0.5 )'] }]
  public legend: boolean = false;

 

  constructor(private _covidDataForChart: EmpoloyeeServiceService, private _covidFullData: EmpoloyeeServiceService) { }

  ngOnInit(): void {
    this.getCovidDataForChart();
    this.getCovidFullData();
  }
  processData(data: any) {
    let country: any = {};
    country.states = [];
    country.active = 0;
    country.cofirmed = 0;
    country.deceased = 0;
    country.recovered = 0;

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
      country.active = country.active + temp.active;
      country.cofirmed = country.cofirmed + temp.confirmed;
      country.recovered = country.recovered + temp.recovered;
      country.deceased = country.deceased + temp.deceased;
      country.states.push(temp);
    }
    return country;
  }

  getCovidDataForChart() {
    return this._covidDataForChart.getcovid19Data().subscribe(data => {
      this.covid19ChartData = this.processData(data);
      this.doughnutChartData = this.getchartData(this.covid19ChartData);
    },
      error => this.doughnutCharerrorMessage = error
    )
  }
  getchartData(covid19ChartData) {
    let temp: number[] =
      [ covid19ChartData.cofirmed,
        covid19ChartData.active,
        covid19ChartData.recovered,
        covid19ChartData.deceased];
    return temp;
  }
 
// End of DoughnutChart

// Start of Line Chart
covidFullData: any;
lineCharterrorMessage: any;
casesinTimeSeries: any;
dialyConfirmed: any;
dialyConfirmedCases: any;
dates: any;
dataPoints: any;
public barChartOptions = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels = [];
public barChartType = 'line';
public barChartLegend = false;
public barChartData = [];
public lineChartColors = [
  {
    borderColor : 'rgba(255,0,0,.6)',
    backgroundColor: 'rgba(255,0,0,.5)',
    label: 'Confirmed Cases',
    fill:1,
  },
  {
    borderColor : 'rgba(0,255,0,0.6)',
    backgroundColor: 'rgba(0,255,0,0.5)',
    label: 'Recovered Cases',
    fill: 2,
  },
  {
    borderColor : 'rgba(0,0,0,0.6)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    label: 'Deceased Cases',
    fill: true,
  },
];
newBarChartData: any = {};
lables: any;


getCovidFullData() {
  return this._covidFullData.getCovidFullData().subscribe((data) => {
    this.covidFullData = data;
    this.newBarChartData = this.dailyConfirmedCaseslData(this.covidFullData);
    this.barChartData = [...this.newBarChartData.chartData];
    this.barChartLabels = [...this.newBarChartData.labels];
  },
    error => this.lineCharterrorMessage = error);
}
dailyConfirmedCaseslData(data: any) {
  let confirm = [];
  let recov = [];
  let deceased = [];
  let labels = []

  for (let i = data.cases_time_series.length - 1; i >= 0; i--) {
    labels.push(data.cases_time_series[i].date);
    confirm.push(data.cases_time_series[i].dailyconfirmed);
    recov.push(data.cases_time_series[i].dailyrecovered);
    deceased.push(data.cases_time_series[i].dailydeceased);
  }
  let result = {
    chartData: [{
      data: confirm, label: 'Confirmed Cases'
    },
    {
      data: recov, label: 'Recovered Cases'
    },
    {
      data: deceased, label: 'Deceased Cases'
    }],
    labels: labels
  }
  return result;
}

sliderChangeEvent(value: number) {
  return value;
}

onInputChange(event: any) {
  let temp = [{data:[]},{data:[]},{data:[]}];
  let tempMain = Object.assign({}, this.newBarChartData);
  if (this.newBarChartData) {
    for (let i = 0; i < this.newBarChartData.chartData.length; i++) {
      temp[i].data = tempMain.chartData[i].data.slice(event.value, tempMain.chartData[i].data.length);
    }
    this.barChartLabels = tempMain.labels.slice(event.value, tempMain.labels.length);
    this.barChartData = temp;
  }
}

getlablelValues(value) {
  console.log(value);
}

// End of Line Chart............

}
