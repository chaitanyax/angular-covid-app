import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CovidLogDataActionType, LoadLogDataAction, LoadLogDataSuccess, LoadLogDataFailure } from '../actions/actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Covid19LogDataService } from '../../covid19-data.service';
import { of } from 'rxjs';
@Injectable()
export class CovidLogDataEffects {
    constructor(private actions: Actions, private loadDataService: Covid19LogDataService) { }
    @Effect() loadLogData = this.actions
        .pipe(
            ofType<LoadLogDataAction>(CovidLogDataActionType.LOAD_LOG_DATA),
            mergeMap(
                () => this.loadDataService.getcovid19LogData()
                    .pipe(
                        map(data => {
                            return new LoadLogDataSuccess(data);
                        }),
                        catchError(error => of(new LoadLogDataFailure(error)))
                    )
            ),
        );

}