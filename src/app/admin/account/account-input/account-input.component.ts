import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Account } from 'shared/interface';
import { AccountInputForm } from './account-input-form';
import { AccountService, LoadingService } from 'shared/service';

/**
 * アカウント変更
 */
@Component({
  selector: 'app-account-input',
  templateUrl: './account-input.component.html',
  styleUrls: ['./account-input.component.scss']
})
export class AccountInputComponent implements OnInit {

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
    this.form = this.formBuilder.group(AccountInputForm.validators);
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
      Object.entries(account).filter(w => this.form.controls[w[0]]).forEach(w => {
        this.form.controls[w[0]].setValue(w[1]);
      });
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
  onSubmit(form: AccountInputForm, isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.isError = false;
    this.loading.setLoading(true);

    // アカウント更新
    form.id = this.account.id;
    this.accountService.saveAccount(form).subscribe(ret => {
      this.loading.setLoading(false);
      if (ret) {
        // 更新完了
        const message = 'アカウントの更新が完了しました';
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
