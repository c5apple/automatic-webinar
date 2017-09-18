import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OptService } from './opt.service';
import { Opt } from 'shared/interface';
import { OptInputForm } from '../../../admin/opt/opt-input/opt-input-form';

/**
 * オプトサービス
 * モック
 */
@Injectable()
export class OptMockService extends OptService {

  /**
   * オプトを取得する
   * @param optId オプトID
   */
  public getOpt(optId?: number): Observable<Opt | Opt[]> {
    const opts = this.createOpts();
    if (optId) {
      return Observable.of(opts.find(opt => opt.id === optId));
    }
    return Observable.of(opts);
  }

  /**
   * オプトを登録/更新する
   */
  public saveOpt(opt: OptInputForm): Observable<any> {
    const optId = 2;
    return Observable.of(optId);
    // return Observable.of(false);
  }

  /**
   * ウェビナー一覧 モック作成
   */
  private createOpts(): Opt[] {
    const opts: Opt[] = [];
    for (let i = 1; i <= 100; i++) {
      opts.push({
        id: i,
        webinarId: i,
        mail: `${i}@example.com`,
        preferredDate: new Date()
      } as Opt);
    }
    return opts;
  }

  /**
   * オプトを削除する
   * @param optIds オプトIDリスト
   */
  public deleteOpt(optIds: number[]): Observable<any> {
    return Observable.of({});
  }

}
