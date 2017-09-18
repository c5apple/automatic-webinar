<?php

require_once('./model/dao/account.php');

/**
 * アカウントAPI
 */
class accountAction extends Action {

  private $account;

  /**
   * コンストラクタ
   */
  public function __construct() {
    parent::__construct();

    $this->account = new Account();
  }

  /**
   * アカウント取得 / アカウント更新
   */
  public function account() {
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
      $this->saveAccount();
    } else {
      $this->getAccount();
    }
  }

  /**
   * アカウント取得
   */
  private function getAccount() {
    $me = Me::getInstance();
    if (!$me->isUser()) {
      parent::forbidden();
    }

    // アカウントID
    $account_id = $me->{'id'};
    $account    = array();

    if ($account_id && is_numeric($account_id)) {
      $where = array(
          'id' => '\'' . $account_id . '\''
      );

      // 検索
      $account = $this->account->select($where);
      if ($account) {
        $account = StringUtil::camelizeArrayRecursive(array_shift($account));
        unset($account['pass']);
      }
    }

    if ($account) {
      echo json_encode($account);
    } else {
      return parent::notFound();
    }
  }

  /**
   * アカウント登録
   */
  private function saveAccount() {
    // 入力値
    $login_id     = isset($_POST['loginId']) ? $_POST['loginId'] : NULL;
    $account_name = isset($_POST['name']) ? $_POST['name'] : NULL;

    if (!$login_id) {
      return parent::badRequest();
    }

    $set   = array(
        'login_id' => StringUtil::toStr($login_id),
        'name'     => StringUtil::toStr($account_name)
    );
    $where = array(
        'id' => Me::getInstance()->{'id'}
    );

    // 更新
    $ret = $this->account->update($set, $where);
    if ($ret) {
      echo json_encode($ret);
    } else {
      // 500 error
      return parent::InternalServerError();
    }
  }

  /**
   * パスワード更新
   */
  public function password() {
    if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
      parent::notFound();
    }
    // 入力値
    $pass = isset($_POST['pass']) ? $_POST['pass'] : NULL;

    if (!$pass) {
      return parent::badRequest();
    }

    $set   = array(
        'pass' => StringUtil::toStr(Cipher::encrypt($pass)),
    );
    $where = array(
        'id' => Me::getInstance()->{'id'}
    );

    // 更新
    $ret = $this->account->update($set, $where);
    if ($ret) {
      echo json_encode($ret);
    } else {
      // 500 error
      return parent::InternalServerError();
    }
  }

}
