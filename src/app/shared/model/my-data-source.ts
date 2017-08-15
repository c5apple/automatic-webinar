import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { MyDatabase } from 'shared/model';

export class MyDataSource<T> extends DataSource<any> {
  constructor(private db: MyDatabase<T>) {
    super();
  }

  connect(): Observable<T[]> {
    return this.db.dataChange;
  }

  disconnect() { }
}
