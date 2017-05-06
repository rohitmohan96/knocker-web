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

  constructor(private afAuth: AngularFireAuth, private jobService: JobService) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => this.user = user);

    this.uid = this.user.uid;
    this.jobs = this.jobService.getPinnedJobs(this.uid);
  }

}
