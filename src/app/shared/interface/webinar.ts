/**
 * ウェビナー
 */
export class Webinar {

  // ----------------------------------
  // API返却値
  // ----------------------------------

  /** ウェビナーID */
  id: number;
  /** ウェビナー名 */
  name: string;

  // ----------------------------------
  // プログラムにて使用
  // ----------------------------------

  /** 選択されているか */
  checked?: boolean;

  constructor(webinar?: any) {
    if (!webinar) {
      return;
    }
    this.id = webinar.id;
    this.name = webinar.name;
  }
}
