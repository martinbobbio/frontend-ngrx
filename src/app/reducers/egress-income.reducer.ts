import * as actionsEgressIncome from './../actions/egress-income.action'
import { EgressIncome } from '../models/egress-income';

export interface State{
    items: EgressIncome[]
}

const initState:State = {
    items:[]
}

export function egressIncomeReducer(state = initState, action:actionsEgressIncome.actions): State{
    switch(action.type){
        case actionsEgressIncome.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item => {
                        return { ...item }
                    })
                ]
            }
        case actionsEgressIncome.CLEAR_ITEMS:
            return {
                items:[]
            }
        default: return state
    }
}