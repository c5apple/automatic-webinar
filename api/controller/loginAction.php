<?php

require_once('./model/dao/account.php');
require_once('./model/dao/session.php');

/**
 * ログインAPI
 */
class loginAction extends Action {

  protected $account;
  protected $session;

  /**
   * コンストラクタ
   */
  public function __construct() {
    parent::__construct();

    $this->account = new Account();
    $this->session = new Session();
  }

  /**
   * ログイン
   * @param string $id ログインID
   * @param string $pass パスワード
   */
  public function login() {
    if (!isset($_POST['id']) || !isset($_POST['pass'])) {
      return parent::Forbidden();
    }
    $login_id = $_POST['id'];
    $pass     = $_POST['pass'];

    $ret = FALSE;

    // アカウント検索
    $account = $this->account->select(array(
        'login_id' => StringUtil::toStr($login_id)
    ));
    if ($account) {
      $account = array_shift($account);

      $hash = $account['pass'];

      $ret = Cipher::verify($pass, $hash);
    }
    if ($ret) {
      // ログイン成功したので認証情報を設定する
      $ret = $this->saveSession($account['id'], $pass);
    }
    if ($ret) {
      echo json_encode($ret);
      return;
    }
    return parent::Forbidden();
  }

  /**
   * 認証情報を保持
   *
   * @param $account_id アカウントID
   * @param $pass パスワード(暗号化前)
   * @param boolean 処理結果
   */
  private function saveSession($account_id, $pass) {
    // 有効期限(2時間)
    $limit_day = time() + 60 * 60 * 2;

    // クッキー
    $session_id = Cipher::encrypt('w' . $pass);
    setcookie(parent::COOKIE_ID, $session_id, $limit_day);

    // セッションテーブル
    $ret = $this->session->insert(array(
        'id'         => StringUtil::toStr($session_id),
        'account_id' => $account_id,
        'limit_day'  => StringUtil::toDatabaseDate($limit_day),
    ));
    if (!$ret) {
      $this->InternalServerError();
    }
    return $ret;
  }

}
