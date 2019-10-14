import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { EgressIncome } from 'src/app/models/egress-income';
import { EgressIncomeService } from 'src/app/providers/egress-income.service';
import { AlertService } from 'src/app/providers/alert.service';
import { ActivateLoadingAction, DesactivateLoadingAction } from 'src/app/actions/ui.action';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit {

  items:EgressIncome[]

  constructor(private _store:Store<AppState>, public _egressIncomeService:EgressIncomeService, public _alertService:AlertService) { }

  ngOnInit() {
    this._store.select('egressIncome').subscribe(egressIncome => this.items = egressIncome.items)
    this._store.select('ui').subscribe(ui => ui.isLoading ? this._alertService.showLoading("Deleting Egress Income") : this._alertService.closeAlert())
  }

  deleteItem(item:EgressIncome){
    this._store.dispatch(new ActivateLoadingAction())
    this._egressIncomeService.deleteEgressIncome(item.uid).then(() => {
      this._store.dispatch(new DesactivateLoadingAction())
      this._alertService.alertSuccess("Item deleted",`${item.description} was deleted`)
    })
  }

}
