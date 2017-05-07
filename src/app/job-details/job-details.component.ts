import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../job.service';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  providers: [JobService]
})
export class JobDetailsComponent implements OnInit {
  pinId: number;

  user: firebase.User;

  pinned: boolean;

  job: Promise<any>;

  map = {
    'C': 'red',
    'C++': 'blue',
    'LINUX': 'black',
    'PYTHON': 'orange',
    'JAVA': 'green',
    'SQL': 'chocolate',
    'JAVASCRIPT': 'grey',
    'CSS': 'brown',
    'HTML': 'black',
    'C#': 'black'
  };

  imageMap = {
    'Infosys Ltd.': 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    'SAP Software Solutions': 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg',
    'Akamai Technologies': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Akamai_logo.svg',
    'Capgemini': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Logo_Capgemini.png',
    'Cisco Systems, Inc.': 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg'
  };

  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private jobService: JobService,
              private router: Router) {
  }


  ngOnInit() {
    const jobId = this.route.snapshot.params['id'];
    this.afAuth.authState.subscribe(user => {
      this.user = user;

      this.job = this.jobService.getJob(jobId);

      this.job
        .then(job => this.jobService.getPinStatus(this.user.uid, job._id))
        .then(value => {
          if (typeof value === 'boolean') {
            this.pinned = false;
          } else {
            this.pinned = true;
            this.pinId = value;
          }
        });
    });
  }

  pinJob(uid, jobId) {
    this.pinned = true;
    this.jobService.pinJob(uid, jobId);
  }

  unpinJob(pinId) {
    this.pinned = false;
    this.jobService.unpinJob(pinId);
  }
}
