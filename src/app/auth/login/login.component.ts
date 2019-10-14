import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { AlertService } from 'src/app/providers/alert.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})

export class LoginComponent implements OnInit {

  constructor(public _authService:AuthService, public _alertService:AlertService , public _store: Store<AppState>) {}

  ngOnInit() {
    this._store.select('ui').subscribe(ui => {
      ui.isLoading ? this._alertService.showLoading("Loading Account") : this._alertService.closeAlert() 
    })
  }

  onSubmit(data:any){
    this._authService.login(data.email, data.password)
  }
}
