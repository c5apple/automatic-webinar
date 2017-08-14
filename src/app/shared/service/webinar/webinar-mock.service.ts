import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WebinarService } from './webinar.service';
import { Webinar } from 'shared/interface';

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
  public getWebinar(webinarId: number): Observable<Webinar> {
    return Observable.of({} as Webinar);
  }

}
