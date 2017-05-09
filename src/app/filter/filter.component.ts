import {Component, OnInit} from '@angular/core';
import {JobService} from '../job.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [JobService]
})
export class FilterComponent implements OnInit {
  enteredKeywords: string[];
  selectedCategory: string;
  selectedCompany: string;

  selected = '';
  location = '';
  enteredLocations: string[];

  jobs: Promise<any>;

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

  companies = [
    'Infosys Ltd.',
    'SAP Software Solutions',
    'Akamai Technologies',
    'Capgemini',
    'Cisco Systems, Inc.'
  ];

  categories = ['ENGINEER', 'CONSULTANT', 'MANAGER', 'DEVELOPER', 'EXECUTIVE'];

  experience: number;
  currentPage = 1;
  maxSize = 5;
  totalItems: number;

  crawlId: number;

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.jobService
      .getCrawlId()
      .then((crawlId) => this.crawlId = crawlId);

    this.filterJobs();
  }

  selectCategory(cat) {
    this.selectedCategory = cat;
    console.log(cat);
  }

  selectCompany(comp) {
    this.selectedCompany = comp;
  }

  filter() {
    this.currentPage = 1;
    this.filterJobs();
  }

  filterJobs(page: number = 1) {
    this.jobs = this.jobService
      .filterJobs(
        page,
        this.enteredLocations,
        this.enteredKeywords,
        this.experience,
        this.selectedCategory,
        this.selectedCompany);

    this.jobs
      .then(jobs => this.totalItems = jobs._meta.total);
  }

  newKeyword() {
    if (!this.enteredKeywords) {
      this.enteredKeywords = [];
    }
    this.enteredKeywords.push(this.selected);
    this.selected = '';
  }

  removeKeyword(index) {
    this.enteredKeywords.splice(index, 1);
  }

  newLocation() {
    if (!this.enteredLocations) {
      this.enteredLocations = [];
    }
    this.enteredLocations.push(this.location);
    this.location = '';
  }

  removeLocation(index) {
    this.enteredLocations.splice(index, 1);
  }
}

