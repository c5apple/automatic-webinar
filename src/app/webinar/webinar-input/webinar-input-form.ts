import { Validators } from '@angular/forms';

/**
 * ウェビナー登録
 * 入力フォーム
 */
export class WebinarInputForm {
  /** ウェビナーID */
  id: number;
  /** ウェビナー名 */
  name: string;

  static validators = {
    /** ウェビナーID */
    id: [{ value: '', disabled: true }],
    /** ウェビナー名 */
    name: ['', Validators.compose([Validators.required, Validators.maxLength(60)])]
  };

}
