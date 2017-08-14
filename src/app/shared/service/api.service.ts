import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

/**
 * APIサービス
 */
@Injectable()
export abstract class ApiService {

  constructor(
    public http: Http
  ) { }

  /**
   * レスポンス情報を処理する。
   * @param o レスポンス情報
   */
  protected getObservable(o: Observable<Response>): Observable<Object> {
    return o.map((res: Response) => {
      let ret: any = {};
      if (res.status >= 200 && res.status < 300) {
        try {
          ret = res.json() || {};
        } catch (e) {
          console.error(e);
        }
      }
      return ret;
    }).catch((e: any) => {
      console.error(e);
      throw e;
    });
  }
}
