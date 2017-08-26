<?php

/**
 * アカウントテーブルクラス
 */
class Account extends dao {

  protected $base_sql_select = 'select * from account';
  protected $base_sql_update = 'update account';
  protected $base_sql_insert = 'insert into account';
  protected $base_sql_delete = 'delete from account';

}
