import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  username:string
  subscription: Subscription = new Subscription()

  constructor(private _store:Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('auth').pipe(filter(auth => auth.user != null)).subscribe(auth => this.username = auth.user.username)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
