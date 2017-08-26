<?php

require_once('./model/session.php');

/**
 * アクション基底クラス
 */
abstract class Action {

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
        return true;
      }
    }
    return false;
  }

  protected function badRequest() {
    // 400 Bad Request
    header('HTTP', true, 400);
    echo json_encode(false);  // TODO メッセージ
    exit;
  }

  protected function forbidden() {
    // 403 Forbidden
    header('HTTP', true, 403);
    echo json_encode(false);
    exit;
  }

  protected function notFound() {
    // 404 NotFound
    header('HTTP', true, 404);
    echo json_encode(false);
    exit;
  }

  protected function InternalServerError() {
    // 500 Internal Server Error
    header('HTTP', true, 500);
    echo json_encode(false);
    exit;
  }

}
