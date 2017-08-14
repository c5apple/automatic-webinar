<?php

/** ログレベル : デバッグ文 */
define('DEBUG', 0);
/** ログレベル : インフォメーション */
define('INFO', 1);
/** ログレベル : 致命的なエラー */
define('ERROR', 2);

/**
 * ログ出力ユーティリティ
 */
class Logger {

  /**
   * ログを記録します
   *
   * @param $logLevel ログレベル
   * <ul>
   * <li>INFO  : インフォメーション</li>
   * <li>ERROR : 致命的なエラー</li>
   * <li>DEBUG : デバッグ文</li>
   * </ul>
   * @param $output 出力文字列
   * @param $path   呼び出し元
   */
  static function logs($logLevel, $output = '', $path = NULL) {
    // TODO ログレベル実装 config.cnf
    $config = DEBUG;
    if ($config > $logLevel) {
      return;
    }
    $lovel = array('[DEBUG]', '[INFO]', '[ERROR]');

    // 呼び出し元情報
    $msg = $lovel[$logLevel];
    if (!is_null($path)) {
      $msg .= $path;
    } else {
      $bt  = debug_backtrace();
      var_dump($bt);
      $msg .= $bt[1]['class'] . $bt[1]['type'] . $bt[1]['function'] . ' : ' . $bt[1]['line'];
//			$msg = $bt[0]['file'] . ' : ' . $bt[1]['class'] . $bt[1]['type'] . $bt[1]['function'] . ' : ' . $bt[1]['line'];
    }

    $now = time();

    // ログファイルパス
    $dir = $_SERVER['DOCUMENT_ROOT'] . BASE_DIR . 'log/' . date('Ym', $now) . '/';
    if (!is_dir($dir)) {
      mkdir($dir, 0705);
    }
    $filePath = $dir . date('Ymd', $now) . '.log';

    // ファイルオープン
    $fp = @fopen($filePath, 'a');
    if ($fp) {
      flock($fp, LOCK_EX);
      fwrite($fp, date("Y/m/d H:i:s") . ' : ' . $msg . ' : ' . $output . "\n");
      flock($fp, LOCK_UN);
      fclose($fp);
    }
    //	file_put_contents($filePath, $output, FILE_APPEND);
  }

}
