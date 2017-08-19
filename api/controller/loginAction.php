<?php

require_once('./model/account.php');

/**
 * ログインAPI
 */
class loginAction extends Action {

  private $account;

  /**
   * コンストラクタ
   */
  public function __construct() {
    parent::__construct();

    $this->account = new Account();
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
        'login_id' => '\'' . $login_id . '\''
    ));
    if ($account) {
      $account = array_shift($account);

//      $hash = password_hash($pass, PASSWORD_BCRYPT); // PHP7.0.0ではオプション非推奨
      $hash = $account['pass'];

      $ret = password_verify($pass, $hash);
    }
    if ($ret) {
      echo json_encode($ret);
      return;
    }
    return parent::Forbidden();
  }

}
