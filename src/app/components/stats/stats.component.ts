import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/providers/alert.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styles: []
})
export class StatsComponent implements OnInit {

  income:number
  egress:number
  incomeTotal:number
  egressTotal:number

  graphicLabels:string[] = ['Income','Egress']
  graphicData:number[] = []

  constructor(private _store:Store<AppState>, public _alertService:AlertService) { }

  ngOnInit() {
    this._store.select('ui').subscribe(ui => ui.isLoading ? this._alertService.showLoading("Loading Egress Income...") : this._alertService.closeAlert())
    this._store.select('egressIncome').subscribe(egressIncome => {
      this.resetValues()
      egressIncome.items.forEach(item => {
        if(item.type === 'income'){
          this.income += item.mount
          this.incomeTotal++
        }else if(item.type === 'egress'){
          this.egress += item.mount
          this.egressTotal++
        }
      })
      this.graphicData = [ this.income, this.egress]
    })
  }

  resetValues(){
    this.income = 0
    this.egress = 0
    this.incomeTotal = 0
    this.egressTotal = 0
  }

}
