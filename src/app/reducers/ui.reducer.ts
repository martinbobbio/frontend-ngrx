import * as actionsUI from './../actions/ui.action'

export interface State{
    isLoading: boolean
}

const initState:State = {
    isLoading: false
}

export function uiReducer(state = initState, action:actionsUI.actions): State{
    switch(action.type){
        case actionsUI.ACTIVATE_LOADING:
            return {
                isLoading:true
            }
        case actionsUI.DESACTIVATE_LOADING:
            return {
                isLoading:false
            }
        default: return state
    }
}