<?php

/**
 * アクション基底クラス
 */
abstract class Action {

  function __construct() {

  }

  protected function forbidden() {
    // 403 Forbidden
    header('HTTP', true, 403);
    echo json_encode(false);
    return;
  }

  protected function notFound() {
    // 404 NotFound
    header('HTTP', true, 404);
    echo json_encode(false);
    return;
  }

}
