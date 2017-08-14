import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WebinarService } from './webinar.service';

/**
 * ウェビナーサービス
 * モック
 */
@Injectable()
export class WebinarMockService extends WebinarService {

  /**
   * ウェビナーを取得する
   * @param webinarId ウェビナーID
   */
  public getWebinar(webinarId: number): Observable<Object> {
    return Observable.of({});
  }

}
