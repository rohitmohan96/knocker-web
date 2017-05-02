import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JobService {
  url = 'http://localhost:5000/Jobs';

  constructor(private http: Http) {
  }

  filterJobs(page: number = 1, locations?: string[], keywords?: string[], experience?: number, category?: string) {
    const where = {};
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

    if (experience) {
      where['experience'] = {
        $in: [experience - 1, experience, experience + 1]
      };
    }

    if (category) {
      where['categories'] = category;
    }


    return this.http
      .get(this.url, {
        search: {
          where: where,
          page: page
        }
      })
      .toPromise()
      .then(res => {
        return res.json();
      });
  }
}
