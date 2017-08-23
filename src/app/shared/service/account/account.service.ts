import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, URLSearchParams } from '@angular/http';

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
    const url = '/api/account';
    return super.getObservable(this.http.get(url)).map(data => data as Account);
  }

  /**
   * アカウントを更新する
   * @param account アカウント情報
   */
  public saveAccount(account: AccountInputForm): Observable<any> {
    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');

    const url = `/api/account`;
    const params = new URLSearchParams();
    params.set('id', account.id.toString());
    params.set('loginId', account.loginId);
    params.set('name', account.name);

    return super.getObservable(this.http.post(url, params.toString(), { 'headers': header }));
  }

  /**
   * パスワードを更新する
   * @param account アカウント情報
   */
  public updatePassword(account: AccountPasswordForm) {
    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');

    const url = `/api/account/password`;
    const params = new URLSearchParams();
    params.set('id', account.id.toString());
    params.set('pass', account.pass);

    return super.getObservable(this.http.post(url, params.toString(), { 'headers': header }));
  }
}
