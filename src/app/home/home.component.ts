import {Component, OnInit} from '@angular/core';
import {JobService} from '../job.service';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [JobService]
})
export class HomeComponent implements OnInit {

  jobs: Promise<any>;
  user: firebase.User;
  uid: string;
  crawlId: number;

  constructor(private afAuth: AngularFireAuth,
              private jobService: JobService) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.user = user;

      if (user) {
        this.uid = user.uid;
        this.jobs = this.jobService.getPinnedJobs(this.uid);

        this.jobs.then(jobs => console.log(jobs));

        this.jobService
          .getCrawlId()
          .then((crawlId) => this.crawlId = crawlId);
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
