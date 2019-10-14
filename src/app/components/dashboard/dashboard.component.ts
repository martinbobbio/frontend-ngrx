import { Component, OnInit } from '@angular/core';
import { EgressIncomeService } from 'src/app/providers/egress-income.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public _egressIncomeService:EgressIncomeService) { }

  ngOnInit() {
    this._egressIncomeService.initEgressIncomeListener()
  }

}
