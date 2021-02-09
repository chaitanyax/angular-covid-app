import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import { ChartsModule } from 'ng2-charts';
import {MatSliderModule} from '@angular/material/slider';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { CovidLogDataComponent } from './covid-log-data/covid-log-data.component';
import { logDataReducer } from './store/reducers/reducers';
import { CovidLogDataEffects } from './store/effect/effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoughnutComponent,
    CovidLogDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeQSRbixoDKdg1DVJcl9kP1zdKVO1b7uo'
    }),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    ChartsModule,
    MatSliderModule,
    EffectsModule.forRoot([CovidLogDataEffects]),
    StoreModule.forRoot({
      loadLogData:logDataReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
