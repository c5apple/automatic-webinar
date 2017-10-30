<?php

/**
 * メールユーティリティ
 */
class Mail {

  /**
   * メールユーティリティ
   * @var Qdmail
   */
  private $mail;

  /** ini  */
  private $ini;

  /**
   * コンストラクタ
   */
  public function __construct() {
    $this->mail = new Qdmail();

    // iniファイル読み込み
    $this->ini = Filer::readIni('mail');

    $param = array(
        'host'     => $this->ini['HOST'], // メールサーバのIPなど
        'port'     => $this->ini['PORT'], // SMTPポート（25,　587 ...）
        'from'     => $this->ini['FROM'], // Return-path: に設定されるメルアド
        'protocol' => $this->ini['PROTOCOL'], // 認証が必要なければ 'SMTP' でよし
        'user'     => $this->ini['SMTP_USER'], // SMTP認証ユーザ
        'pass'     => $this->ini['SMTP_PASS'], // SMTP認証パスワード
    );
    $this->mail->smtpServer($param);
    $this->mail->errorDisplay(false);
    $this->mail->smtp(true);
  }

  /**
   * メール送信
   *
   * @todo 件名と本文を引数とすること
   *
   * @param string $to 送信先メールアドレス
   * @param string $preferred_date 希望日
   * @return boolean 送信成功/失敗
   */
  public function send($to, $preferred_date) {
    // 本文整形
    $week           = array('日', '月', '火', '水', '木', '金', '土');
    $preferred_date = StringUtil::formatYmd('Y年m月d日', $preferred_date) . '(' . $week[StringUtil::formatYmd('w', $preferred_date)] . ')';
    $body           = str_replace('{PREFERRED_DATE}', $preferred_date, Filer::fileGetContents('bin/config/thanks.txt'));

    // メール作成
    $this->mail->to($to);                               // 宛先
    $this->mail->from(array($this->ini['FROM']));       // 送信元
    $this->mail->subject($this->ini['THANKS_TITLE']);   // 件名
    $this->mail->text($body);                           // メッセージ
    // メール送信
    return $this->mail->send();
  }

}
