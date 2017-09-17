import { Validators, FormControl, ValidationErrors } from '@angular/forms';

/**
 * オプト登録
 * 入力フォーム
 */
export class OptInputForm {
  /** オプトID */
  id: number;
  /** ウェビナーID */
  webinarId: number;
  /** メールアドレス */
  mail: string;
  /** 希望日 */
  preferredDate: Date;

  static validators = {
    /** オプトID */
    id: [{ value: '', disabled: true }],
    /** ウェビナーID */
    webinarId: ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
    /** メールアドレス */
    mail: ['', Validators.compose([Validators.required, Validators.maxLength(254), OptInputForm.mailFormat])],
    /** 希望日 */
    preferredDate: [null, Validators.compose([Validators.required, Validators.maxLength(10)])]
  };

  /**
   * メールフォーマット
   */
  static mailFormat(control: FormControl): ValidationErrors {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { "mailFormat": true };
    }
    return null;
  }
}
