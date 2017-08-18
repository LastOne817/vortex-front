import { Injectable } from '@angular/core';
import { DAG } from './dag';

import 'rxjs/add/operator/toPromise'
import { dag } from './mock-dag';

@Injectable()
export class DAGService {
  private dagUrl = '/';

  getDAG(): Promise<DAG> {
    return Promise.resolve(dag);
  }
}
