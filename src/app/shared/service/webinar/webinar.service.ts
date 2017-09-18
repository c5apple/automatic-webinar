import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';
import { Webinar } from 'shared/interface';
import { WebinarInputForm } from '../../../admin/webinar/webinar-input/webinar-input-form';

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
    const url = '/api/webinar';
    const params = {
      id: webinarId
    };
    return this.get(url, params).map((data: Webinar | Webinar[]) => {
      if ('length' in data) {
        return Array.from((data as Webinar[])).map(row => new Webinar(row));
      }
      return new Webinar(data);
    });
  }

  /**
   * ウェビナーを登録/更新する
   */
  public saveWebinar(webinar: WebinarInputForm): Observable<any> {
    const url = '/api/webinar';
    return this.post(url, webinar);
  }

  /**
   * ウェビナーを削除する
   * @param webinarIds ウェビナーIDリスト
   */
  public deleteWebinar(webinarIds: number[]): Observable<any> {
    const url = `/api/webinar`;
    const params = {
      id: webinarIds
    };
    return this.delete(url, params);
  }

}
