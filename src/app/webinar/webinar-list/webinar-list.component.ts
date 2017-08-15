import { Component, OnInit, ViewChild } from '@angular/core';
import { MdPaginator } from '@angular/material';

import { MyDatabase, MyDataSource } from 'shared/model';
import { WebinarService } from 'shared/service';
import { Webinar } from 'shared/interface';

/**
 * ウェビナー一覧
 */
@Component({
  selector: 'app-webinar-list',
  templateUrl: './webinar-list.component.html',
  styleUrls: ['./webinar-list.component.scss']
})
export class WebinarListComponent implements OnInit {
  displayedColumns = ['id', 'name'];
  database: MyDatabase<Webinar>;
  dataSource: MyDataSource<Webinar> | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(
    private webinarService: WebinarService
  ) { }

  ngOnInit() {
    // ウェビナーを検索する
    this.webinarService.getWebinar().subscribe((webinars: Webinar[]) => {
      console.log(webinars);
      if ('length' in webinars && 0 < webinars.length) {
        this.database = new MyDatabase<Webinar>(webinars);
        this.dataSource = new MyDataSource<Webinar>(this.database, this.paginator);
      }
    });
  }
}
