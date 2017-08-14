import { Component, OnInit } from '@angular/core';

import { WebinarService } from 'shared/service';
import { Webinar } from 'shared/interface';

@Component({
  selector: 'app-webinar-list',
  templateUrl: './webinar-list.component.html',
  styleUrls: ['./webinar-list.component.sass']
})
export class WebinarListComponent implements OnInit {

  constructor(
    private webinarService: WebinarService
  ) { }

  ngOnInit() {
    // TODO ウェビナーID
    let webiinarId = 1;

    // ウェビナーを検索する
    this.webinarService.getWebinar(webiinarId).subscribe((webinar: Webinar) => {
      console.log(webinar);
    });
  }

}
