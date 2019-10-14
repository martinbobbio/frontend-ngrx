import * as reducersUI from './reducers/ui.reducer'
import * as reducersAuth from './reducers/auth.reducer'
import * as reducersEgressIncome from './reducers/egress-income.reducer'

import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    ui:reducersUI.State,
    auth:reducersAuth.State,
    egressIncome: reducersEgressIncome.State
}

export const appReducers:ActionReducerMap<AppState> = {
    ui: reducersUI.uiReducer,
    auth: reducersAuth.authReducer,
    egressIncome: reducersEgressIncome.egressIncomeReducer
}