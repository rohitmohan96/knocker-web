import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobService} from '../job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  providers: [JobService]
})
export class JobDetailsComponent implements OnInit {

  job: Promise<any>;

  constructor(private route: ActivatedRoute, private jobService: JobService) {
  }
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


  ngOnInit() {
    const jobId = this.route.snapshot.params['id'];

    this.job = this.jobService.getJob(jobId);
  }

}
