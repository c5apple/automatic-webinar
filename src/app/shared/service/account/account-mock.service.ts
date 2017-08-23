import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AccountService } from './account.service';
import { Account } from 'shared/interface';
import { AccountInputForm } from '../../../admin/account/account-input/account-input-form';
import { AccountPasswordForm } from '../../../admin/account/account-password/account-password-form';

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
  public saveAccount(account: AccountInputForm): Observable<any> {
    return Observable.of(true);
  }

  /**
   * パスワードを更新する
   * @param account アカウント情報
   */
  public updatePassword(account: AccountPasswordForm): Observable<any> {
    return Observable.of(true);
  }
}
