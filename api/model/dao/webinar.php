<?php

/**
 * ウェビナーテーブルクラス
 */
class Webinar extends dao {

  protected $base_sql_select = 'select * from webinar';
  protected $base_sql_update = 'update webinar';
  protected $base_sql_insert = 'insert into webinar';
  protected $base_sql_delete = 'delete from webinar';

}
