import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';
import { Opt } from 'shared/interface';
import { OptInputForm } from '../../../admin/opt/opt-input/opt-input-form';

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
    const url = './api/a/opt';
    const params = {
      id: optId
    };
    return this.get(url, params).map((data: Opt | Opt[]) => {
      if ('length' in data) {
        return Array.from((data as Opt[])).map(row => new Opt(row));
      }
      return new Opt(data);
    });
  }

  /**
   * オプトを登録/更新する
   */
  public saveOpt(opt: OptInputForm): Observable<any> {
    const url = './api/a/opt';
    const params = {
      id: opt.id,
      webinarId: opt.webinarId,
      mail: opt.mail,
      preferredDate: this.formatDate(opt.preferredDate)
    };
    return this.post(url, params);
  }

  /** Date -> String */
  private formatDate(date: Date): string {
    const y = `${date.getFullYear()}`;
    const m = `0${date.getMonth() + 1}`.slice(-2);
    const d = `0${date.getDate()}`.slice(-2);
    return `${y}-${m}-${d}`;
  }

  /**
   * オプトを削除する
   * @param optIds オプトIDリスト
   */
  public deleteOpt(optIds: number[]): Observable<any> {
    const url = `./api/a/opt`;
    const params = {
      id: optIds
    };
    return this.delete(url, params);
  }

}
