import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EgressIncome } from 'src/app/models/egress-income';
import { EgressIncomeService } from 'src/app/providers/egress-income.service';
import { AlertService } from 'src/app/providers/alert.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { ActivateLoadingAction, DesactivateLoadingAction } from 'src/app/actions/ui.action';

@Component({
  selector: 'app-egress-income',
  templateUrl: './egress-income.component.html',
  styles: []
})
export class EgressIncomeComponent implements OnInit, OnDestroy {

  form:FormGroup
  type = 'income'
  subscription:Subscription = new Subscription()

  constructor(public _egressIncomeService:EgressIncomeService, public _alertService:AlertService, private _store:Store<AppState>) {
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      mount: new FormControl(0, Validators.min(0))
    })
  }

  ngOnInit(){ 
    this.subscription = this._store.select('ui').subscribe(ui => {
    ui.isLoading ? this._alertService.showLoading("Creating Egress Income") : this._alertService.closeAlert() 
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  createEgressIncome(){
    this._store.dispatch(new ActivateLoadingAction())
    const egressIncome = new EgressIncome({...this.form.value, type: this.type})
    this._egressIncomeService.createEgressIncome(egressIncome).then(() => {
      this._store.dispatch(new DesactivateLoadingAction())
      this._alertService.alertSuccess(`${egressIncome.type.charAt(0).toUpperCase()}${egressIncome.type.slice(1)} created`,`${egressIncome.description} with $${egressIncome.mount}`)
      this.form.reset({mount:0})
    }).catch(error => {
      this._alertService.alertError("Error", error)
      this._store.dispatch(new DesactivateLoadingAction())
    })
    
  }

}
