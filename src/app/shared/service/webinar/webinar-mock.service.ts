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
  public getWebinar(webinarId?: number): Observable<Webinar | Webinar[]> {
    const webinars = this.createWebinars();
    if (webinarId) {
      return Observable.of(webinars.filter(webinar => webinar.id === webinarId));
    }
    return Observable.of(webinars);
  }

  /**
   * ウェビナー一覧 モック作成
   */
  private createWebinars(): Webinar[] {
    const webinars: Webinar[] = [];
    for (let i = 1; i <= 100; i++) {
      webinars.push({ id: i, name: `よく分かるウェビナー講座${i}` } as Webinar);
    }
    return webinars;
  }

  /**
   * ウェビナーを削除する
   * @param webinarIds ウェビナーIDリスト
   */
  public deleteWebinar(webinarIds: number[]): Observable<any> {
    return Observable.of({});
  }

}
