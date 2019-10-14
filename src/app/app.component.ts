import { Component, OnInit } from '@angular/core';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  
  constructor(public _authService:AuthService){

  }

  ngOnInit() {
    this._authService.initAuthListener()
  }

}
