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
   * @return boolean 送信成功/失敗
   */
  public function send($to) {
    // メール作成
    $this->mail->to($to);                               // 宛先
    $this->mail->from(array($this->ini['FROM']));       // 送信元
    $this->mail->subject($this->ini['THANKS_TITLE']);   // 件名
    $this->mail->text(Filer::fileGetContents('bin/config/thanks.txt'));  // メッセージ
    // メール送信
    return $this->mail->send();
  }

}
