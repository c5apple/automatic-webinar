import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';
import { Webinar } from 'shared/interface';

/**
 * ウェビナーサービス
 */
@Injectable()
export class WebinarService extends ApiService {

  /**
   * ウェビナーを取得する
   * @param webinarId ウェビナーID
   */
  public getWebinar(webinarId?: number): Observable<Webinar | Webinar[]> {
    let url = `/api/webinar`;
    if (webinarId) {
      const params = new URLSearchParams();
      params.set('id', webinarId.toString());
      url += `?${params.toString()}`;
    }
    return super.getObservable(this.http.get(url)).map(data => data as Webinar | Webinar[]);
  }
}
