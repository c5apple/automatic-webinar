<?php

/**
 * ファイル操作
 */
class Filer {

  /**
   * iniファイル読み込み
   *
   * @param string $cnf コンフィグ名
   * @return array()
   */
  static function readIni($cnf) {
    return parse_ini_file($_SERVER['DOCUMENT_ROOT'] . BASE_DIR . 'bin/config/' . $cnf . '.ini');
  }

}
