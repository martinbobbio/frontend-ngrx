import { Action } from '@ngrx/store';
import { EgressIncome } from '../models/egress-income';

export const SET_ITEMS = '[EGRESS INCOME] Set Items'
export const CLEAR_ITEMS = '[EGRESS INCOME] Clear Items'

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS
    constructor(public items:EgressIncome[]){}
}

export class ClearItemsAction implements Action {
    readonly type = CLEAR_ITEMS
}

export type actions = SetItemsAction | ClearItemsAction