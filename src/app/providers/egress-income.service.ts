import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { EgressIncome } from '../models/egress-income';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from '../actions/egress-income.action';

@Injectable({
  providedIn: 'root'
})
export class EgressIncomeService {

  constructor(private _afDB:AngularFirestore, public _authService:AuthService, private _store:Store<AppState>) { }

  initEgressIncomeListener(){
    this._store.select('auth').pipe(filter(auth => auth.user != null)).subscribe(auth => this.getEgressIncomeItems(auth.user.uid))
  }

  private getEgressIncomeItems(uid:string){
    this._afDB.collection(`${uid}/egress-income/items`).snapshotChanges().pipe(map(data => {
      return data.map(data => {
        return{
          uid: data.payload.doc.id,
          ...data.payload.doc.data()
        }
      })
    })).subscribe((items:any[]) => {
      this._store.dispatch(new SetItemsAction(items))
    })
  }

  createEgressIncome(egressIncome:EgressIncome){
    const user = this._authService.getUser()
    return this._afDB.doc(`${user.uid}/egress-income`).collection('items').add({...egressIncome})
  }

  deleteEgressIncome(uid:string){
    const user = this._authService.getUser()
    return this._afDB.doc(`${user.uid}/egress-income/items/${uid}`).delete()
  }
}
