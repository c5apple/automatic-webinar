<?php

/**
 * オプトテーブルクラス
 */
class Opt extends dao {

  protected $base_sql_select = 'select * from opt';
  protected $base_sql_update = 'update opt';
  protected $base_sql_insert = 'insert into opt';
  protected $base_sql_delete = 'delete from opt';

}
