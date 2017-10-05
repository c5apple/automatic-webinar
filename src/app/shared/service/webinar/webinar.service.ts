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
  private webinars: Webinar[];

  /**
   * ウェビナーを取得する
   * @param webinarId ウェビナーID
   */
  public getWebinar(webinarId?: number, useCache?: boolean): Observable<Webinar | Webinar[]> {
    // キャッシュ利用
    if (useCache && webinarId === undefined && this.webinars) {
      return Observable.of(this.webinars);
    }

    // API実行
    const url = '/api/a/webinar';
    const params = {
      id: webinarId
    };
    return this.get(url, params).map((data: Webinar | Webinar[]) => {
      if ('length' in data) {
        this.webinars = Array.from((data as Webinar[])).map(row => new Webinar(row));
        return this.webinars;
      }
      return new Webinar(data);
    });
  }

  /**
   * ウェビナーを登録/更新する
   */
  public saveWebinar(webinar: WebinarInputForm): Observable<any> {
    // キャッシュクリア
    this.webinars = undefined;

    // API実行
    const url = '/api/a/webinar';
    return this.post(url, webinar);
  }

  /**
   * ウェビナーを削除する
   * @param webinarIds ウェビナーIDリスト
   */
  public deleteWebinar(webinarIds: number[]): Observable<any> {
    // キャッシュクリア
    this.webinars = undefined;

    // API実行
    const url = `/api/a/webinar`;
    const params = {
      id: webinarIds
    };
    return this.delete(url, params);
  }

}
