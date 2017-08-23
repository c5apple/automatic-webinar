import { Validators } from '@angular/forms';

/**
 * アカウント
 * 入力フォーム
 */
export class AccountInputForm {
  /** ID */
  id: number;
  /** ログインID */
  loginId: string;
  /** アカウント名 */
  name: string;

  static validators = {
    /** ID */
    id: [{ value: '', disabled: true }],
    /** ログインID */
    loginId: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
    /** アカウント名 */
    name: ['', Validators.compose([Validators.maxLength(32)])]
  };

}
