import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class MyDatabase<T> {
  dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  get data(): T[] {
    return this.dataChange.value;
  }
  set data(data: T[]) {
    this.dataChange.next(data);
  }

  constructor(private dataList: T[]) {
    dataList.forEach(data => {
      this.add<T>(data);
    });
  }

  add<T>(addData) {
    const copiedData = this.data.slice();
    copiedData.push(addData);
    this.dataChange.next(copiedData);
  }
}

