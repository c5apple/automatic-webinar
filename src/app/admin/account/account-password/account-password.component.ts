import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Account } from 'shared/interface';
import { AccountPasswordForm } from './account-password-form';
import { AccountService, LoadingService } from 'shared/service';

/**
 * パスワード変更
 */
@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.scss']
})
export class AccountPasswordComponent implements OnInit {

  /** アカウント情報 */
  account: Account;

  /** 入力フォーム */
  form: FormGroup;

  /** APIエラー */
  isError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MdSnackBar,
    private router: Router,
    private loading: LoadingService,
    private accountService: AccountService
  ) {
    this.form = this.formBuilder.group(AccountPasswordForm.validators);
  }

  ngOnInit() {
    this.getAccount();
  }

  /**
   * アカウントを取得する
   */
  getAccount() {
    this.loading.setLoading(true);
    this.accountService.getAccount().subscribe((account: Account) => {
      this.loading.setLoading(false);

      this.account = account;
    }, (error) => {
      this.loading.setLoading(false);
      this.router.navigate(['/']);
    });
  }

  /**
   * 登録ボタン
   * @param form 入力フォーム
   * @param isValid 有効か
   */
  onSubmit(form: AccountPasswordForm, isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.isError = false;
    this.loading.setLoading(true);

    // パスワード更新
    this.accountService.updatePassword(form).subscribe(ret => {
      this.loading.setLoading(false);
      if (ret) {
        // 更新完了
        const message = 'パスワードの更新が完了しました';
        this.snackBar.open(message, undefined, { duration: 4000 });
      } else {
        this.isError = true;
      }
    }, (error) => {
      this.loading.setLoading(false);
      this.router.navigate(['/']);
    });
  }
}
