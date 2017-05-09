import {Router} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  @Input()
  jobs: Promise<any>;

  @Input()
  crawlId: number;

  imageMap = {
    'Infosys Ltd.': 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    'SAP Software Solutions': 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg',
    'Akamai Technologies': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Akamai_logo.svg',
    'Capgemini': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Logo_Capgemini.png',
    'Cisco Systems, Inc.': 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg'
  };

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

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  gotoJob(id) {
    this.router.navigate(['/job', id]);
  }
}
