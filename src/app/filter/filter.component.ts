import {Component, OnInit} from '@angular/core';
import {JobService} from '../job.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [JobService]
})
export class FilterComponent implements OnInit {
  enteredKeywords: string[] = [];
  selectedCategory: string = 'Category';

  selected = '';
  location = '';
  enteredLocations: string[] = [];

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

  keywords = [
    'C',
    'C++',
    'LINUX',
    'PYTHON',
    'JAVA',
    'SQL',
    'JAVASCRIPT',
    'CSS',
    'HTML',
    'C#'
  ];

  categories = ['ENGINEER', 'CONSULTANT', 'MANAGER', 'DEVELOPER', 'EXECUTIVE'];

  experience: number;
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

  filter() {
    this.jobs = this.jobservice.filterJobs(1, this.enteredLocations, this.enteredKeywords, this.experience, this.selectedCategory);
    this.jobs.then(jobs => this.totalItems = jobs._meta.total);

  }

  newKeyword() {
    this.enteredKeywords.push(this.selected);
    this.selected = '';
  }

  removeKeyword(index) {
    this.enteredKeywords.splice(index, 1);
  }

  newLocation() {
    this.enteredLocations.push(this.location);
    this.location = '';
  }

  removeLocation(index) {
    this.enteredLocations.splice(index, 1);
  }
}

