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

  /**
   * ファイル読み込み
   *
   * @param string $file_name ファイル名
   * @return string
   */
  static function fileGetContents($file_name) {
    return file_get_contents($_SERVER['DOCUMENT_ROOT'] . BASE_DIR . $file_name);
  }

}
