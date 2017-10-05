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
   * オプト登録
   */
  public function opt() {
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
      $this->saveOpt();
    } else {
      return parent::notFound();
    }
  }

  /**
   * オプト登録
   */
  private function saveOpt() {
    // オプトID
    $opt_id         = NULL;
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

}
