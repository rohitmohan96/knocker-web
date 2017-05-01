import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';
import {FilterComponent} from './filter/filter.component';
import {HomeComponent} from './home/home.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {Route, RouterModule} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

const config = {
  apiKey: 'AIzaSyB5BLz_gBdc2RTpLxngsSlTuxiVk5r6sBo',
  authDomain: 'knocker-3a330.firebaseapp.com',
  databaseURL: 'https://knocker-3a330.firebaseio.com',
  projectId: 'knocker-3a330',
  storageBucket: 'knocker-3a330.appspot.com',
  messagingSenderId: '726197767436'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Route[] = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'jobSearch',
    component: FilterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(config, firebaseAuthConfig),
    PaginationModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
