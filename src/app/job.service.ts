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

  pinJob(uid, jobId): Promise<any> {
    return this.http
      .post(this.url + '/pinnedJobs', {uid: uid, job: jobId})
      .toPromise();
  }

  unpinJob(pinId) {
    return this.http
      .delete(this.url + '/pinnedJobs/' + pinId)
      .toPromise();
  }

  getPinStatus(uid, jobId): Promise<number | boolean> {
    return this.http
      .get(this.url + '/pinnedJobs', {
        search: {
          where: {
            uid: uid,
            job: jobId
          }
        }
      })
      .toPromise()
      .then(res => {
        if (res.json()._items[0]) {
          return res.json()._items[0]._id;
        } else {
          return false;
        }
      });
  }

  getPinnedJobs(uid): Promise<any> {
    const where = {uid: uid};

    return this.http
      .get(this.url + '/pinnedJobs', {
        search: {
          where: where,
          embedded: {job: 1}
        }
      })
      .toPromise()
      .then(res => {
        const items = res.json();
        items._items = items._items.map(item => item.job);
        return items;
      });
  }
}
