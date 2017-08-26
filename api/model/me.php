<?php

/**
 * ユーザクラス
 */
class Me {

  /** インスタンス */
  private static $instance;

  /**
   * インスタンス生成
   * @return Me
   */
  public static function getInstance() {
    // TODO PHP7にするなら修正する
    if (!isset(self::$instance)) {
      $klass          = __CLASS__;
      self::$instance = new $klass;
    }
    return self::$instance;
  }

  /**
   * コンストラクタ
   */
  public function __construct($id = NULL) {
    if (!is_null($id)) {
      $account = new Account();
      $rs      = $account->select(array('id' => $id));

      if (!is_null($rs)) {
        $rs = array_shift($rs);
        unset($rs['pass']);
        $this->set($rs);
      }
    }
  }

  /**
   * ユーザを設定する
   */
  public function set($me) {
    foreach ($me as $key => $val) {
      $this->{$key} = $val;
    }
  }

  /**
   * ユーザが存在するか
   *
   * @return boolean
   */
  public function isUser() {
    if (isset($this->{'id'}) && $this->{'id'}) {
      return TRUE;
    }
    return FALSE;
  }

}
