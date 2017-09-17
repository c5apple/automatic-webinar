import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';
import { Opt } from 'shared/interface';
import { WebinarInputForm } from '../../../admin/webinar/webinar-input/webinar-input-form';

/**
 * オプトサービス
 */
@Injectable()
export class OptService extends ApiService {

  /**
   * オプトを取得する
   * @param optId オプトID
   */
  public getOpt(optId?: number): Observable<Opt | Opt[]> {
    const url = '/api/opt';
    const params = {
      id: optId
    };
    return this.get(url, params).map(data => data as Opt | Opt[]);
  }

  /**
   * オプトを登録/更新する
   */
  public saveOpt(opt: WebinarInputForm): Observable<any> {
    const url = '/api/opt';
    return this.post(url, opt);
  }

  /**
   * オプトを削除する
   * @param optIds オプトIDリスト
   */
  public deleteOpt(optIds: number[]): Observable<any> {
    const url = `/api/opt`;
    const params = {
      id: optIds
    };
    return this.delete(url, params);
  }

}
