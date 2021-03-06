import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {FilterComponent} from './filter/filter.component';
import {HomeComponent} from './home/home.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {Route, RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import {AngularFireAuthModule} from 'angularfire2/auth';

const config = {
  apiKey: ***REMOVED***,
  authDomain: ***REMOVED***,
  databaseURL: ***REMOVED***,
  projectId: ***REMOVED***,
  storageBucket: ***REMOVED***,
  messagingSenderId: ***REMOVED***
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
    path: 'job/:id',
    component: JobDetailsComponent
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
    HomeComponent,
    JobsComponent,
    JobDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    PaginationModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
