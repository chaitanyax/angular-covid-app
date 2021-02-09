import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { LogData } from '../model/model'

export enum CovidLogDataActionType {
    LOAD_LOG_DATA = '[COVID LOG] Load',
    LOAD_LOG_DATA_SUCCESS = '[COVID LOG] Load Success',
    LOAD_LOG_DATA_FAILURE = '[COVID LOG] Load Failure'
}

export class LoadLogDataAction implements Action {
    readonly type = CovidLogDataActionType.LOAD_LOG_DATA;
    constructor() { }
}

export class LoadLogDataSuccess implements Action {
    readonly type = CovidLogDataActionType.LOAD_LOG_DATA_SUCCESS;
    constructor(public payload: LogData[]) { }
}

export class LoadLogDataFailure implements Action {
    readonly type = CovidLogDataActionType.LOAD_LOG_DATA_FAILURE;
    constructor(public payload: Error) { }
}

export type LoadLogDataingActions = LoadLogDataAction | LoadLogDataSuccess | LoadLogDataFailure;