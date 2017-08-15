import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class MyDatabase<T> {
  dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  get data(): T[] { return this.dataChange.value; }

  constructor(private dataList: T[]) {
    dataList.forEach(data => {
      this.add<T>(data);
    });
  }

  add<T>(webinar) {
    const copiedData = this.data.slice();
    copiedData.push(webinar);
    this.dataChange.next(copiedData);
  }
}

