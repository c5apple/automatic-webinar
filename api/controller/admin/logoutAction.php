<?php

require_once('./model/dao/session.php');

/**
 * ログアウトAPI
 */
class logoutAction extends AdminAction {

  protected $session;

  /**
   * コンストラクタ
   */
  public function __construct() {
    parent::__construct();

    $this->session = new Session();
  }

  /**
   * ログアウト
   */
  public function logout() {
    // 認証情報を削除する
    $ret = $this->removeSession();

    if ($ret) {
      echo json_encode($ret);
      return;
    }
    return parent::Forbidden();
  }

  /**
   * 認証情報を削除
   */
  private function removeSession() {
    // 有効期限
    $limit_day = time() - 1;

    // クッキー
    $session_id = '';
    setcookie(parent::COOKIE_ID, $session_id, $limit_day);

    // セッションテーブル
    $ret = $this->session->delete(array(
        'account_id' => Me::getInstance()->{'id'}
    ));
    if (!$ret) {
      $this->InternalServerError();
    }
    return $ret;
  }

}
