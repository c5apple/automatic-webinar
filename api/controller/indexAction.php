<?php

/**
 * アクション
 */
class indexAction extends Action {

  /**
   * コンストラクタ
   */
  public function __construct() {
    parent::__construct();
  }

  public function index() {
    echo json_encode(true);
  }

}
