import { Validators } from '@angular/forms';

/**
 * アカウント
 * 入力フォーム
 */
export class AccountForm {
  /** ID */
  id: number;
  /** ログインID */
  loginId: string;
  /** パスワード */
  pass: string;
  /** アカウント名 */
  name: string;

  static validators = {
    /** ID */
    id: [{ value: '', disabled: true }],
    /** ログインID */
    loginId: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
    /** パスワード */
    pass: ['', Validators.compose([Validators.required, Validators.maxLength(60)])],
    /** パスワード（確認） */
    passConfirm: ['', Validators.compose([Validators.required, Validators.maxLength(60)])],
    /** アカウント名 */
    name: ['', Validators.compose([Validators.maxLength(32)])]
  };

}
