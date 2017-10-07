<?php

require_once('./model/dao/session.php');
require_once('./model/me.php');

/**
 * 管理者アクション基底クラス
 */
abstract class AdminAction extends Action {

  const COOKIE_ID = 'wsessionid';

  protected $session;

  function __construct() {
    // ログイン以外、認証チェック
    if ('loginAction' !== get_called_class()) {
      if (!$this->isLoggedIn()) {
        // NG
        return $this->forbidden();
      }
    }
  }

  /**
   * ログイン状態か判定
   * @return boolean
   */
  protected function isLoggedIn() {
    if ($_COOKIE && isset($_COOKIE[self::COOKIE_ID])) {
      // セッションテーブルにレコードが存在するか
      $this->session = new Session();

      $session = $this->session->select(array(
          'id' => StringUtil::toStr($_COOKIE[self::COOKIE_ID]),
      ));

      // 有効期限を切れていないか
      if ($session && time() < strtotime($session[0]['limit_day'])) {
        $me = array(
            'id' => $session[0]['account_id']
        );
        Me::getInstance()->set($me);
        return true;
      }
    }
    return false;
  }

}
