import { Injectable } from '@angular/core';
import { DAG, DAGJson } from './dag';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'

@Injectable()
export class DAGService {
  private dagUrl = '/';

  constructor(private http: Http) { }

  getDAG(): Promise<DAG> {
    // return Promise.resolve(dag);
    return this.http.get(this.dagUrl)
      .toPromise()
      .then(response => {
        const data: DAGJson = response.json() as DAGJson;
        return data.toDAG();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error occured: ', error);
    return Promise.reject(error.message || error);
  }
}
