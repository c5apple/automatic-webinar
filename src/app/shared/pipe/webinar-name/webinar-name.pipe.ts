import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WebinarService } from 'shared/service';
import { Webinar } from 'shared/interface';

@Pipe({
  name: 'webinarName'
})
export class WebinarNamePipe implements PipeTransform {

  webinars: Webinar[];
  apiCall;
  value: any;

  constructor(private webinarService: WebinarService) {
    this.webinarService.getWebinar().subscribe((webinars: Webinar[]) => {
      this.webinars = webinars;

      this.apiCall = Observable.create(observer => {
        const webinar = this.webinars.find((w: Webinar) => w.id === this.value);
        observer.next(webinar ? webinar.name : '');
      });
    });
  }

  transform(value: any, args?: any): any {
    if (value) {
      this.value = value;
      return this.apiCall.first();
    }
    return Observable.of('');
  }

}
