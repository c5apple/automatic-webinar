import { Component, OnInit } from '@angular/core';

import { MyDatabase, MyDataSource } from 'shared/model';
import { WebinarService } from 'shared/service';
import { Webinar } from 'shared/interface';

@Component({
  selector: 'app-webinar-list',
  templateUrl: './webinar-list.component.html',
  styleUrls: ['./webinar-list.component.scss']
})
export class WebinarListComponent implements OnInit {
  displayedColumns = ['id', 'name'];
  exampleDatabase: MyDatabase<Webinar>;
  dataSource: MyDataSource<Webinar> | null;

  constructor(
    private webinarService: WebinarService
  ) { }

  ngOnInit() {
    // TODO ウェビナーID
    let webiinarId = 1;

    // ウェビナーを検索する
    this.webinarService.getWebinar().subscribe((webinars: Webinar[]) => {
      console.log(webinars);
      if ('length' in webinars && 0 < webinars.length) {
        this.exampleDatabase = new MyDatabase<Webinar>(webinars);
        this.dataSource = new MyDataSource<Webinar>(this.exampleDatabase);
      }
    });
  }
}
