import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { MyDatabase } from 'shared/model';

export class MyDataSource<T> extends DataSource<any> {
  constructor(
    private db: MyDatabase<T>,
    private paginator: MdPaginator
  ) {
    super();
  }

  connect(): Observable<T[]> {
    const displayDataChanges = [
      this.db.dataChange,
      this.paginator.page,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.db.data.slice();
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect() { }
}
