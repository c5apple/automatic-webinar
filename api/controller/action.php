<?php

require_once('./model/dao/session.php');
require_once('./model/me.php');

/**
 * アクション基底クラス
 */
abstract class Action {

  function __construct() {

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
