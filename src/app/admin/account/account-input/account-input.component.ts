import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { Account } from 'shared/interface';
import { AccountInputForm } from './account-input-form';
import { AccountService } from 'shared/service';

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
    this.accountService.getAccount().subscribe((account: Account) => {
      this.account = account;
      Object.entries(account).filter(w => this.form.controls[w[0]]).forEach(w => {
        this.form.controls[w[0]].setValue(w[1]);
      });
    });
    // TODO 取得できない場合エラー
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

    console.log(form);

    // アカウント更新
    form.id = this.account.id;
    this.accountService.saveAccount(form).subscribe(ret => {
      if (ret) {
        // 更新完了
        const message = 'アカウントの更新が完了しました';
        this.snackBar.open(message, undefined, { duration: 4000 });
      } else {
        this.isError = true;
      }
    });
  }
}
