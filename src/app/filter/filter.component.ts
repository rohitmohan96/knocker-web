import {Component, OnInit} from '@angular/core';
import {JobService} from '../job.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [JobService]
})
export class FilterComponent implements OnInit {
  selectedCategory: string = 'Category';

  jobs: Promise<any>;

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

  categories = ['ENGINEER', 'CONSULTANT', 'MANAGER', 'DEVELOPER', 'EXECUTIVE'];

  currentPage = 1;
  maxSize = 5;
  numPages = 0;
  totalItems: number;

  constructor(private jobservice: JobService) {
  }

  ngOnInit() {
    this.jobs = this.jobservice.filterJobs();
    this.jobs.then(jobs => this.totalItems = jobs._meta.total);
  }

  pageChanged(event) {
    this.jobs = this.jobservice.filterJobs(event.page);
    this.jobs.then(jobs => this.totalItems = jobs._meta.total);
  }

  selectCategory(cat) {
    this.selectedCategory = cat;
    console.log(cat);
  }
}

