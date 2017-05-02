import {Component, Input, OnInit} from "@angular/core";

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

  urlMap = {
    'https://jobopenings.infosys.com': 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    'https://jobs.sap.com': 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg',
    'https://akamaijobs.referrals.selectminds.com/': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Akamai_logo.svg',
    'https://jobs.capgemini.com': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Logo_Capgemini.png',
    'https://jobs.cisco.com': 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg'
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

  constructor() {
  }

  ngOnInit() {
  }

  getImage(url: string) {
    for (const key in this.urlMap) {
      if (url.startsWith(key)) {
        return this.urlMap[key];
      }
    }
    return '';
  }
}
