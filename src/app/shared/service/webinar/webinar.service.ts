import { Injectable } from '@angular/core';
import { Response, Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class WebinarService {

  constructor(
    private http: Http
  ) { }

  /**
   * ウェビナーを取得する
   * @param webinarId ウェビナーID
   */
  public getWebinar(webinarId: number) {
    const params = new URLSearchParams();
    params.set('id', webinarId.toString());

    const url = `/api/webinar?${params.toString()}`;
    return this.getObservable(this.http.get(url));
  }

  /**
   * レスポンス情報を処理する。
   * @param o レスポンス情報
   */
  private getObservable(o: Observable<Response>): Observable<Object> {
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
