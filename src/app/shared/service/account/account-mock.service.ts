import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AccountService } from './account.service';
import { Account } from 'shared/interface';
import { AccountForm } from '../../../admin/account/account-form';

/**
 * アカウントサービス
 * モック
 */
@Injectable()
export class AccountMockService extends AccountService {

  /**
   * アカウントを取得する
   */
  public getAccount(): Observable<Account> {
    return Observable.of({
      id: 1,
      loginId: 'test',
      name: 'テストユーザ'
    } as Account);
  }

  /**
   * アカウントを更新する
   * @param account アカウント情報
   */
  public saveAccount(account: AccountForm): Observable<any> {
    return Observable.of(true);
  }
}
