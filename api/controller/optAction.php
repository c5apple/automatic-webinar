<?php

require_once('./model/dao/opt.php');

/**
 * オプトAPI
 */
class optAction extends Action {

  private $opt;

  /**
   * コンストラクタ
   */
  public function __construct() {
    parent::__construct();

    $this->opt = new Opt();
  }

  /**
   * オプト取得 / オプト登録 / オプト削除
   */
  public function opt() {
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
      $this->saveOpt();
    } else if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'DELETE') {
      $this->deleteOpt();
    } else {
      $this->getOpt();
    }
  }

  /**
   * オプト取得
   */
  private function getOpt() {
    // オプトID
    $opt_id = isset($_GET['id']) ? $_GET['id'] : NULL;
    $opt    = array();

    if ($opt_id && is_numeric($opt_id)) {
      $where = array(
          'id' => StringUtil::toStr($opt_id)
      );

      // 検索
      $opt = $this->opt->select($where);
      if ($opt) {
        $opt = StringUtil::camelizeArrayRecursive(array_shift($opt));
      }
    } else {
      // 全件検索
      $opt = array_map(function($row) {
        return StringUtil::camelizeArrayRecursive($row);
      }, $this->opt->select());
    }
    echo json_encode($opt);
  }

  /**
   * オプト登録
   */
  private function saveOpt() {
    // オプトID
    $opt_id         = isset($_POST['id']) ? $_POST['id'] : NULL;
    $webinar_id     = isset($_POST['webinarId']) ? $_POST['webinarId'] : NULL;
    $mail           = isset($_POST['mail']) ? $_POST['mail'] : NULL;
    $preferred_date = isset($_POST['preferredDate']) ? $_POST['preferredDate'] : NULL;

    if (!$webinar_id || !is_numeric($webinar_id) || !$mail || !$preferred_date) {
      return parent::badRequest();
    }

    if ($opt_id && is_numeric($opt_id)) {
      $set   = array(
          'webinar_id'     => $webinar_id,
          'mail'           => StringUtil::toStr($mail),
          'preferred_date' => StringUtil::toStr($preferred_date),
      );
      $where = array(
          'id' => $opt_id
      );

      // 更新
      $ret = $this->opt->update($set, $where);
    } else {
      $value = array(
          'id'             => 'NULL',
          'webinar_id'     => $webinar_id,
          'mail'           => StringUtil::toStr($mail),
          'preferred_date' => StringUtil::toStr($preferred_date),
      );

      // 登録
      $ret = $this->opt->insert($value);
      if ($ret) {
        $opt_id = $this->opt->getQuery()->getLastInsertId();
      }
    }

    if ($ret) {
      echo json_encode($opt_id);
    } else {
      // 500 error
      return parent::InternalServerError();
    }
  }

  /**
   * オプト削除
   */
  private function deleteOpt() {
    // オプトIDリスト
    $opt_id_list = isset($_GET['id']) && is_array($_GET['id']) ? $_GET['id'] : array();
    $opt_id_list = array_filter($opt_id_list, function($opt) {
      return is_numeric($opt);
    });

    if ($opt_id_list && 0 < count($opt_id_list)) {

      array_walk($opt_id_list, function($opt_id) {

        $where = array('id' => $opt_id);

        // 論理削除
        $ret = $this->opt->deleteFlg($where);
        if (!$ret) {
          // 500 error
          return parent::InternalServerError();
        }
      });
      echo json_encode(true);
    } else {
      return parent::forbidden();
    }
  }

}
