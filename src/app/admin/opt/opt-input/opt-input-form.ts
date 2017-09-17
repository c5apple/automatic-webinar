import { Validators } from '@angular/forms';

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
    mail: ['', Validators.compose([Validators.required, Validators.maxLength(254)])],
    /** 希望日 */
    preferredDate: ['', Validators.compose([Validators.required, Validators.maxLength(10)])]
  };

}
