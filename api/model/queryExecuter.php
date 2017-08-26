<?php

/**
 * DB接続クラス
 */
class QueryExecuter {

  private static $DB_SERVER;
  private static $DB_USER;
  private static $DB_PASS;
  private static $DB_NAME;
  private static $link;
  private static $query;

  /** インスタンス */
  private static $instance;

  /**
   * インスタンス生成
   * @return QueryExecuter
   */
  public static function getInstance() {
    if (!isset(self::$instance)) {
      self::$instance = new QueryExecuter();
    }
    return self::$instance;
  }

  /**
   * コンストラクタ
   */
  function __construct() {
    // iniファイル読み込み
    $hash = Filer::readIni('db');

    self::$DB_SERVER = $hash['DB_SERVER'];
    self::$DB_USER   = $hash['DB_USER'];
    self::$DB_PASS   = $hash['DB_PASS'];
    self::$DB_NAME   = $hash['DB_NAME'];

    self::connect();
  }

  /**
   * デストラクタ
   */
  function __destruct() {
    self::close();
  }

  /**
   * DBに接続する
   */
  public static function connect() {
    $flg = false;

    if (!self::$link = mysql_connect(self::$DB_SERVER, self::$DB_USER, self::$DB_PASS)) {
      // DBサーバ接続失敗
      $flg = true;
    } else if (!mysql_select_db(self::$DB_NAME, self::$link)) {
      // DB接続失敗
      $flg = true;
    } else if (!mysql_set_charset('utf8', self::$link)) {
      // DBの文字コード設定失敗
      $flg = true;
    }

    // 失敗
    if ($flg) {
      throw new ErrorException(mysql_error());
    }
  }

  /**
   * DBから切断する
   */
  public static function close() {
    // 結果保持用メモリを解放する
    if (!is_null(self::$query)) {
      mysql_free_result(self::$query);
    }

    // DB切断
    if (isset(self::$link)) {
      mysql_close(self::$link);
    }
  }

  /**
   * クエリーを発行する
   */
  function query($sql) {
    if (!isset($sql))
      return null;
    return mysql_query($sql, self::$link);
  }

  /**
   * last_insert_id を取得する
   *
   * @return int
   */
  public function getLastInsertId() {
    return mysql_insert_id();
  }

  /**
   * トランザクションを開始する
   */
  public static function start() {
    return mysql_query('START TRANSACTION;', self::$link);
  }

  /**
   * コミットする
   */
  public static function commit() {
    $ret = mysql_query('COMMIT;', self::$link);

    // 再接続
    self::close();
    self::connect();

    return $ret;
  }

  /**
   * ロールバックする
   */
  public static function rollback() {
    $ret = mysql_query('ROLLBACK;', self::$link);

    return $ret;
  }

}

/**
 * DBアクセスクラス
 */
class dao {

  /**
   * @var QueryExecuter
   */
  protected $qe;
  protected $base_sql_select   = 'select * from test_table';
  protected $base_sql_update   = 'update test_table';
  protected $base_sql_insert   = 'insert into test_table';
  protected $base_sql_delete   = 'delete from test_table';
  protected $base_sql_truncate = 'truncate test_table';

  /**
   * コンストラクタ
   */
  function __construct() {
    $this->qe = QueryExecuter::getInstance();
  }

  /**
   * デストラクタ
   */
  function __destruct() {
//		unset($this->qe);
  }

  /**
   * クエリを設定する
   */
  function setQuery(&$qe) {
    $this->qe = $qe;
  }

  /**
   * クエリを返却する
   */
  function getQuery() {
    return $this->qe;
  }

  /**
   * カラム名を取得する
   */
  function getColumns() {
    $sql = $this->base_sql_select . ' limit 1';

    $rs = $this->qe->query($sql);
    return array_keys(mysql_fetch_array($rs, MYSQL_ASSOC));
  }

  /**
   * クエリーを発行する
   */
  function query($sql) {
    // クエリ発行
    $rs = $this->qe->query($sql);
    return $this->setArray($rs);
  }

  /**
   * レコードを取得する
   */
  function select($array_where = '', $array_sort = '', $limit = NULL) {
    // SQL文生成
    $sql = $this->base_sql_select;
    $sql .= $this->createWhere($array_where);
    $sql .= $this->createOrderBy($array_sort);
    $sql .= $this->createLimit($limit);

    // クエリ発行
    $rs = $this->qe->query($sql);
    return $this->setArray($rs);
  }

  /**
   * レコードを取得する（LIKE検索用）
   */
  function selectLike($array_where = '', $array_sort = '') {
    // SQL文生成
    $sql = $this->base_sql_select;
    $sql .= $this->createWhereLike($array_where);
    $sql .= $this->createOrderBy($array_sort);

    // クエリ発行
    $rs = $this->qe->query($sql);
    return $this->setArray($rs);
  }

  /**
   * レコードを取得する（IN検索用）
   */
  function selectIn($array_where = '', $array_sort = '') {
    // SQL文生成
    $sql = $this->base_sql_select;
    $sql .= $this->createWhereIn($array_where);
    $sql .= $this->createOrderBy($array_sort);

    // クエリ発行
    $rs = $this->qe->query($sql);
    return $this->setArray($rs);
  }

  /**
   * レコードの行数を取得する
   */
  function getCount($array = '') {
    // SQL文生成
    $sql = $this->base_sql_select . $this->createWhere($array);

    // クエリ発行
    $rs = $this->qe->query($sql);
    return mysql_num_rows($rs);
  }

  /**
   * レコードセットより、配列を再構築する
   */
  function setArray($rs) {
    $ret = NULL;
    $cnt = 0;

    if ($rs && mysql_num_rows($rs) > 0) {
      while ($row = mysql_fetch_array($rs, MYSQL_ASSOC)) {
        // 削除フラグは除外する
        if (isset($row['delete_flg']) && $row['delete_flg']) {
          continue;
        }
        // 不要カラム
        unset($row['delete_flg']);
        unset($row['create_day']);
        unset($row['create_user']);
        unset($row['update_day']);
        unset($row['update_user']);

        $ret[$cnt++] = $row;
      }
    }
    return $ret;
  }

  /**
   * レコードを更新する
   */
  function update($array_set, $array_where = '') {
    // SQL文生成
    $sql = $this->base_sql_update;
    $sql .= $this->createSet($array_set);
    $sql .= $this->updateDay();
    $sql .= $this->createWhere($array_where);

    // クエリ発行
    $rs = $this->qe->query($sql);

    if (!$rs) {
      Logger::logs(ERROR, $sql);
      Logger::logs(ERROR, mysql_error());

      QueryExecuter::rollback();

      throw new Exception(mysql_error());
    }
    return $rs;
  }

  /**
   * レコードを更新する（IN検索用）
   */
  function updateIn($array_set, $array_where = '') {
    // SQL文生成
    $sql = $this->base_sql_update;
    $sql .= $this->createSet($array_set);
    $sql .= $this->createDay();
    $sql .= $this->updateDay();
    $sql .= $this->createWhereIn($array_where);

    // クエリ発行
    $rs = $this->qe->query($sql);

    if (!$rs) {
      Logger::logs(ERROR, $sql);
      Logger::logs(ERROR, mysql_error());

      QueryExecuter::rollback();

      throw new Exception(mysql_error());
    }
    return $rs;
  }

  /**
   * レコードを登録する
   */
  function insert($array_value = array()) {
    // SQL文生成
    $sql = $this->base_sql_insert;
    $sql .= $this->createSet($array_value);
    $sql .= $this->createDay();
    $sql .= $this->updateDay();

    // クエリ発行
    $rs = $this->qe->query($sql);

    if (!$rs) {
      Logger::logs(ERROR, $sql);
      Logger::logs(ERROR, mysql_error());

      QueryExecuter::rollback();

      throw new Exception(mysql_error());
    }
    return $rs;
  }

  /**
   * レコードを削除する
   */
  function delete($array_where = array()) {
    // SQL文生成
    $sql = $this->base_sql_delete;
    $sql .= $this->createWhere($array_where);

    // クエリ発行
    $rs = $this->qe->query($sql);

    if (!$rs) {
      Logger::logs(ERROR, $sql);
      Logger::logs(ERROR, mysql_error());

      QueryExecuter::rollback();

      throw new Exception(mysql_error());
    }
    return $rs;
  }

  /**
   * 削除フラグを立てる
   */
  function deleteFlg($array_where = array()) {
    // SQL文生成
    $sql = $this->base_sql_update;
    $sql .= $this->createSet(
            array(
                'delete_flg'  => 1,
                'update_user' => Me::getInstance()->{'id'},
                'update_day'  => StringUtil::toDatabaseDate(),
            )
    );
    $sql .= $this->createWhere($array_where);

    // クエリ発行
    $rs = $this->qe->query($sql);

    if (!$rs) {
      Logger::logs(ERROR, $sql);
      Logger::logs(ERROR, mysql_error());

      QueryExecuter::rollback();

      throw new Exception(mysql_error());
    }
    return $rs;
  }

  /**
   * 配列より、Values句を生成する
   */
  function createValues($array) {
    if (is_array($array) && 0 < count($array)) {
      $keys = join(',', array_keys($array));
      $vals = join(',', array_values($array));

      $ret = ' (' . $keys . ') values (' . $vals . ')';
      return $ret;
    } else {
      return '';
    }
  }

  /**
   * 配列より、Set句を生成する
   */
  function createSet($array) {
    $ret = '';
    if (is_array($array) && 0 < count($array)) {
      foreach ($array as $key => $val) {
        if ($ret != '') {
          $ret .= ', ';
        }
        $ret .= $key . '=' . $val;
      }
      return ' set ' . $ret;
    } else {
      return '';
    }
  }

  /**
   * 配列より、Where句を生成する
   */
  function createWhere($array) {
    if (is_array($array) && 0 < count($array)) {
      foreach ($array as $key => $val) {
        $ret[] = $key . '=' . $val;
      }
      return ' where ' . implode(' and ', $ret);
    } else {
      return '';
    }
  }

  /**
   * 配列より、Where句を生成する（LIKE検索用）
   */
  function createWhereLike($array) {
    $ret = NULL;
    if (is_array($array) && 0 < count($array)) {
      foreach ($array as $key => $val) {
        if (!is_null($ret)) {
          $ret .= ' and ';
        }
        $ret .= $key . ' like \'' . $val . '\'';
      }
      return ' where ' . $ret;
    } else {
      return '';
    }
  }

  /**
   * 配列より、Where句を生成する（In検索用）
   */
  function createWhereIn($array) {
    $ret = '';
    if (is_array($array) && 0 < count($array)) {
      foreach ($array as $key => $val) {
        if ($ret != '') {
          $ret .= ' and ';
        }
        if (is_array($val) && 0 < count($val)) {
          $ret .= $key . ' in (' . implode(',', $val) . ')';
        } else {
          $ret .= $key . '=' . $val;
        }
      }
      return ' where ' . $ret;
    } else {
      return '';
    }
  }

  /**
   * 配列より、OrderBy句を生成する
   */
  function createOrderBy($array) {
    if (is_array($array) && 0 < count($array)) {
      return ' order by ' . join(',', $array);
    } else {
      return '';
    }
  }

  /**
   * LIMIT 句を生成する
   */
  function createLimit($limit = NULL) {
    if (!is_null($limit) && is_numeric($limit)) {
      return ' LIMIT ' . $limit;
    } else {
      return '';
    }
  }

  /**
   * 作成日時を生成する
   */
  function createDay() {
    $me      = Me::getInstance();
    $user_id = $me->isUser() ? $me->{'id'} : 0;

    $ret = ' , create_day=' . StringUtil::toDatabaseDate();
    $ret .= ' , create_user=' . $user_id;

    return $ret;
  }

  /**
   * 更新日時を生成する
   */
  function updateDay() {
    $me      = Me::getInstance();
    $user_id = $me->isUser() ? $me->{'id'} : 0;

    $ret = ' , update_day=' . StringUtil::toDatabaseDate();
    $ret .= ' , update_user=' . $user_id;


    return $ret;
  }

}
