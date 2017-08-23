import { Validators, ValidationErrors, FormControl } from '@angular/forms';

/**
 * アカウント
 * 入力フォーム
 */
export class AccountPasswordForm {
  /** ID */
  id: number;
  /** パスワード */
  pass: string;

  static validators = {
    /** ID */
    id: [{ value: '', disabled: true }],
    /** パスワード */
    pass: ['', Validators.compose([Validators.required, Validators.maxLength(60)])],
    /** パスワード（確認） */
    passConfirm: ['', Validators.compose([Validators.required, Validators.maxLength(60), AccountPasswordForm.samePass])]
  };

  /**
   * パスワードとパスワード（確認）が同じか
   */
  static samePass(control: FormControl): ValidationErrors {
    const pass = document.querySelector('input[formcontrolname="pass"]') as HTMLInputElement;
    if (pass && pass.value !== control.value) {
      return { different: true };
    }
    control.markAsDirty({ onlySelf: false });
    return null;
  }

}
