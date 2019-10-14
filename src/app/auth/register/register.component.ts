import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AlertService } from 'src/app/providers/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {


  constructor(public _authService:AuthService, public _alertService:AlertService , public _store: Store<AppState>) {}

  ngOnInit() {
    this._store.select('ui').subscribe(ui => {
      ui.isLoading ? this._alertService.showLoading("Creating Account") : this._alertService.closeAlert() 
    })
  }

  onSubmit(data:any){
    this._authService.createUser(data.username, data.email, data.password)
  }

}
