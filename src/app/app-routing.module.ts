import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CovidLogDataComponent} from './covid-log-data/covid-log-data.component';
import {DoughnutComponent} from  './doughnut/doughnut.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home',component: HomeComponent},
  {path:'charts', component:DoughnutComponent},
  {path: 'updates', component:CovidLogDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
