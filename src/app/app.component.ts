import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user;

  ngOnInit(): void {
    this.af.auth.subscribe((auth) => {
      if (auth) {
        console.log(auth);
        this.user = auth.auth;
      } else {
        this.user = null;
      }
    });
  }

  constructor(private af: AngularFire) {

  }
  logout() {
    this.af.auth.logout();
  }
  login() {
    this.af.auth.login();
  }
}
