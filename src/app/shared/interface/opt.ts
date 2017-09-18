/**
 * オプト
 */
export class Opt {

  // ----------------------------------
  // API返却値
  // ----------------------------------

  /** オプトID */
  id: number;
  /** ウェビナーID */
  webinarId: number;
  /** メールアドレス */
  mail: string;
  /** 希望日 */
  preferredDate: Date;

  // ----------------------------------
  // プログラムにて使用
  // ----------------------------------

  /** 選択されているか */
  checked?: boolean;

  constructor(opt?: any) {
    if (!opt) {
      return;
    }
    this.id = opt.id;
    this.webinarId = opt.webinarId;
    this.mail = opt.mail;
    this.preferredDate = new Date(opt.preferredDate);
  }
}
