import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators'
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../actions/ui.action';
import * as firebase from 'firebase';
import { SetUserAction, UnsetUserAction } from '../actions/auth.action';
import { Subscription } from 'rxjs';
import { ClearItemsAction } from '../actions/egress-income.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription:Subscription = new Subscription()
  private user:User

  constructor(private _afAuth:AngularFireAuth, private _alertService:AlertService, private _afDB:AngularFirestore , private router:Router, private _store:Store<AppState>) { }

  initAuthListener(){
    this._afAuth.authState.subscribe((user:firebase.User) =>{
      if(user){
        this.userSubscription = this._afDB.doc(`${user.uid}/user`).valueChanges().subscribe((userDB:any) => {
          this._store.dispatch(new SetUserAction(new User(userDB)))
          this.user = new User(userDB)
        })
      }else{
        this.user = null
        this.userSubscription.unsubscribe()
      }
    })
  }

  isAuth(){
    return this._afAuth.authState.pipe(map(fbUser => {
      if(fbUser == null) this.router.navigate(['/login'])
      return fbUser != null
    }))
  }

  createUser(username: string, email: string, password: string){

    this._store.dispatch(new ActivateLoadingAction())

    this._afAuth.auth.createUserWithEmailAndPassword(email, password).then(response => {
      const user: User = {
        uid: response.user.uid,
        email: response.user.email,
        username
      }
      this._afDB.doc(`${user.uid}/user`).set(user).then(() => {
        this._store.dispatch(new DesactivateLoadingAction())
        this.router.navigate(['/'])
      }).catch(error => {
        this._store.dispatch(new DesactivateLoadingAction())
        this._alertService.alertError('Error in Database', error.message)
      })
    }).catch(error => {
      this._store.dispatch(new DesactivateLoadingAction())
      this._alertService.alertError('Error in Register', error.message)
    })
  }

  login(email:string, password:string){

    this._store.dispatch(new ActivateLoadingAction())

    this._afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this._store.dispatch(new DesactivateLoadingAction())
      this.router.navigate(['/'])
    }).catch(error => {
      this._alertService.alertError('Error in Login', error.message)
      this._store.dispatch(new DesactivateLoadingAction())
    })
    
  }

  logout(){
    this.router.navigate(['/login'])
    this._afAuth.auth.signOut()

    this._store.dispatch(new UnsetUserAction())
    this._store.dispatch(new ClearItemsAction())
  }

  getUser(){
    return { ...this.user }
  }
  
}
