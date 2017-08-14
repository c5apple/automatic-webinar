import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';

/**
 * ウェビナーサービス
 */
@Injectable()
export class WebinarService extends ApiService {

  /**
   * ウェビナーを取得する
   * @param webinarId ウェビナーID
   */
  public getWebinar(webinarId: number): Observable<Object> {
    const params = new URLSearchParams();
    params.set('id', webinarId.toString());

    const url = `/api/webinar?${params.toString()}`;
    return super.getObservable(this.http.get(url));
  }
}
