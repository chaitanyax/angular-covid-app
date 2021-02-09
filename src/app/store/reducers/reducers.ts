import { Action, Store } from '@ngrx/store';
import * as actions from '../actions/actions';
import { LogData } from '../model/model';

export interface LogDataLoadingState {
    list: LogData[],
    loading: boolean,
    error: Error,
};

const initialState: LogDataLoadingState = {
    list: [],
    loading: false,
    error: undefined,
};
export function logDataReducer(state: LogDataLoadingState = initialState, action: actions.LoadLogDataingActions) {
    switch (action.type) {
        case actions.CovidLogDataActionType.LOAD_LOG_DATA:
            return { ...state, loading: true }
        case actions.CovidLogDataActionType.LOAD_LOG_DATA_SUCCESS:
            return { ...state, list: action.payload.reverse(), loading: false }
        case actions.CovidLogDataActionType.LOAD_LOG_DATA_FAILURE:
            return { ...state, error: action.payload, loading: false, }
        default:
            return state;
    }
}


