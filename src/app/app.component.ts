import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: firebase.User;

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => this.user = user);
  }

  constructor(private afAuth: AngularFireAuth) {

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
