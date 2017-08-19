import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, Headers, URLSearchParams } from '@angular/http';

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
    let url = `/api/webinar`;
    if (webinarId) {
      const params = new URLSearchParams();
      params.set('id', webinarId.toString());
      url += `?${params.toString()}`;
    }
    return super.getObservable(this.http.get(url)).map(data => data as Webinar | Webinar[]);
  }

  /**
   * ウェビナーを登録/更新する
   */
  public saveWebinar(webinar: WebinarInputForm): Observable<any> {
    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');

    const url = `/api/webinar`;
    const params = new URLSearchParams();
    params.set('id', webinar.id ? webinar.id.toString() : '');
    params.set('name', webinar.name.toString());

    return super.getObservable(this.http.post(url, params.toString(), { 'headers': header }));
  }

  /**
   * ウェビナーを削除する
   * @param webinarIds ウェビナーIDリスト
   */
  public deleteWebinar(webinarIds: number[]): Observable<any> {
    let url = `/api/webinar`;
    const params = new URLSearchParams();
    webinarIds.forEach(webinarId => {
      params.append('id[]', webinarId.toString());
    });
    url += `?${params.toString()}`;

    return super.getObservable(this.http.delete(url));
  }

}
