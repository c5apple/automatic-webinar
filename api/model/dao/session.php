<?php

/**
 * セッションテーブルクラス
 */
class Session extends dao {

  protected $base_sql_select = 'select * from session';
  protected $base_sql_update = 'update session';
  protected $base_sql_insert = 'insert into session';
  protected $base_sql_delete = 'delete from session';

}
