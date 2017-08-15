import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { MyDatabase } from 'shared/model';

export class MyDataSource<T> extends DataSource<any> {
  filterChange = new BehaviorSubject('');
  get filter(): string { return this.filterChange.value; }
  set filter(filter: string) { this.filterChange.next(filter); }

  constructor(
    private db: MyDatabase<T>,
    private paginator: MdPaginator
  ) {
    super();
  }

  connect(): Observable<T[]> {
    const displayDataChanges = [
      this.db.dataChange,
      this.filterChange,
      this.paginator.page,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      // filter
      const data = this.db.data.slice().filter((item: T) => {
        let searchStr = (item['name']).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      // paginator
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect() { }
}
