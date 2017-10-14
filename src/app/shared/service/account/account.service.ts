import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from 'shared/service/api.service';
import { Account } from 'shared/interface';
import { AccountInputForm } from '../../../admin/account/account-input/account-input-form';
import { AccountPasswordForm } from '../../../admin/account/account-password/account-password-form';

/**
 * アカウントサービス
 */
@Injectable()
export class AccountService extends ApiService {

  /**
   * アカウントを取得する
   */
  public getAccount(): Observable<Account> {
    const url = './api/a/account';
    return this.get(url).map(data => data as Account);
  }

  /**
   * アカウントを更新する
   * @param account アカウント情報
   */
  public saveAccount(account: AccountInputForm): Observable<any> {
    const url = './api/a/account';
    return this.post(url, account);
  }

  /**
   * パスワードを更新する
   * @param account アカウント情報
   */
  public updatePassword(account: AccountPasswordForm) {
    const url = './api/a/account/password';
    return this.post(url, account);
  }
}
