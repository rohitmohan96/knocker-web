import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JobService {
  url = 'http://localhost:5000';

  constructor(private http: Http) {
  }

  filterJobs(page: number = 1, locations?: string[], keywords?: string[], experience?: number, category?: string, company?: string) {
    let where = {};
    let projection;
    let sort;

    if (locations) {
      where['$text'] = {
        $search: locations.join(' ')
      };
      projection = {
        score: {
          $meta: 'textScore'
        }
      };

      sort = '[("score", {"$meta": "textScore"})]';
    }

    if (keywords) {
      where['keywords'] = {
        $all: keywords
      };
    }

    if (experience) {
      where['experience'] = {
        $in: [experience - 1, experience, experience + 1]
      };
    }

    if (category) {
      where['categories'] = category;
    }

    if (company) {
      where['company'] = company;
    }

    return this.http
      .get(this.url + '/Jobs', {
        search: {
          where: where,
          projection: projection,
          sort: sort,
          page: page
        }
      })
      .toPromise()
      .then(res => res.json());
  }

  getCrawlId(): Promise<number> {
    return this.http.get(this.url + '/crawl')
      .toPromise()
      .then(res => res.json()._items[0].crawl_id);
  }

  getJob(jobId) {
    return this.http.get(this.url + '/Jobs' + '/' + jobId)
      .toPromise()
      .then(res => res.json());
  }
}
