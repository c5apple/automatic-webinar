<?php

require_once('./model/webinar.php');

/**
 * ウェビナーAPI
 */
class webinarAction extends Action {

  private $webinar;

  /**
   * コンストラクタ
   */
  public function __construct() {
    parent::__construct();

    $this->webinar = new Webinar();
  }

  /**
   * ウェビナー取得 / ウェビナー登録 / ウェビナー削除
   */
  public function webinar() {
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
      $this->saveWebinar();
    } else if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'DELETE') {
      $this->deleteWebinar();
    } else {
      $this->getWebinar();
    }
  }

  /**
   * ウェビナー取得
   */
  private function getWebinar() {
    // ウェビナーID
    $webinar_id = isset($_GET['id']) ? $_GET['id'] : NULL;
    $webinar    = array();

    if ($webinar_id && is_numeric($webinar_id)) {
      $where = array(
          'id' => '\'' . $webinar_id . '\''
      );

      // 検索
      $webinar = $this->webinar->select($where);
      if ($webinar) {
        $webinar = array_shift($webinar);
      }
    } else {
      // 全件検索
      $webinar = $this->webinar->select();
    }

    if ($webinar) {
      echo json_encode($webinar);
    } else {
      return parent::notFound();
    }
  }

  /**
   * ウェビナー登録
   */
  private function saveWebinar() {
    // ウェビナーID
    $webinar_id   = isset($_POST['id']) ? $_POST['id'] : NULL;
    $webinar_name = isset($_POST['name']) ? $_POST['name'] : NULL;
    $webinar      = array();

    if (!$webinar_name) {
      return parent::badRequest();
    }

    if ($webinar_id && is_numeric($webinar_id)) {
      $set   = array(
          'name' => '\'' . $webinar_name . '\''
      );
      $where = array(
          'id' => '\'' . $webinar_id . '\''
      );

      // 更新
      $ret = $this->webinar->update($set, $where);
    } else {
      $value = array(
          'id'   => 'NULL',
          'name' => '\'' . $webinar_name . '\''
      );

      // 登録
      $ret = $this->webinar->insert($value);
      if ($ret) {
        $webinar_id = $this->webinar->getQuery()->getLastInsertId();
      }
    }

    if ($ret) {
      echo json_encode($webinar_id);
    } else {
      // TODO 500 error
      return parent::InternalServerError();
    }
  }

  /**
   * ウェビナー削除
   */
  private function deleteWebinar() {
    // ウェビナーIDリスト
    $webinar_id_list = isset($_GET['id']) && is_array($_GET['id']) ? $_GET['id'] : array();
    $webinar_id_list = array_filter($webinar_id_list, function($webinar) {
      return is_numeric($webinar);
    });

    if ($webinar_id_list && 0 < count($webinar_id_list)) {

      array_walk($webinar_id_list, function($webinar_id) {

        $where = array('id' => $webinar_id);

        // 論理削除
        $ret = $this->webinar->deleteFlg($where);
        if (!$ret) {
          // TODO 500 error
          $ret = false;
        }
      });
      echo json_encode(true);
    } else {
      return parent::forbidden();
    }
  }

}
