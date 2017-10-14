<?php
// ビルド時にはコメントアウトする。TODO configを別ファイルに定義する
define('BASE_DIR', '/automatic-webinar/api/');

date_default_timezone_set('Asia/Tokyo');

try {
  header('Access-Control-Allow-Origin: *');
  header('content-type: application/json; charset=utf-8');
  header('X-Content-Type-Options : nosniff');
  header_remove('X-Powered-By');

  require_once('./service/cipher.php');
  require_once('./service/filer.php');
  require_once('./service/logger.php');
  require_once('./service/stringUtil.php');
  require_once('./model/queryExecuter.php');

  $do = filter_input(INPUT_GET, 'do');

  // GETパラメータ解析
  $dos      = explode('/', $do);
  $dosCount = count($dos);
  switch ($dosCount) {
    case 1:
      $dir = '';
      $cls = ($dos[0] ?: 'index') . 'Action';
      $mtd = $dos[0] ?: 'index';
      break;
    case 2:
      if ($dos[0] === 'a') {
        $dir = 'admin/';
        $cls = ($dos[1] ?: 'index') . 'Action';
        $mtd = $dos[1] ?: 'index';
      } else {
        $dir = '';
        $cls = ($dos[0] ?: 'index') . 'Action';
        $mtd = $dos[1] ?: 'index';
      }
      break;
    case 3:
      if ($dos[0] === 'a') {
        $dir = 'admin/';
        $cls = ($dos[1] ?: 'index') . 'Action';
        $mtd = $dos[2] ?: 'index';
      } else {
        // 404エラー
        header("HTTP/1.0 404 Not Found");
        Logger::logs(ERROR, '404 not found[ ' . $do . ' ]', '');
        exit;
      }
      break;
    default:
      // 404エラー
      header("HTTP/1.0 404 Not Found");
      Logger::logs(ERROR, '404 not found[ ' . $do . ' ]', '');
      exit;
      break;
  }

  // アクションクラス読み込み
  require_once('./controller/action.php');
  require_once('./controller/admin/adminAction.php');
  if (file_exists('./controller/' . $dir . $cls . '.php')) {
    require_once('./controller/' . $dir . $cls . '.php');
  }

  if (!class_exists($cls)) {
    // クラスなし
    // 404エラー
    header("HTTP/1.0 404 Not Found");
    Logger::logs(ERROR, '404 class not found[ ' . $cls . ' ]', '');
  } else if (!method_exists($cls, $mtd)) {
    // メソッドなし
    // 404エラー
    header("HTTP/1.0 404 Not Found");
    Logger::logs(ERROR, '404 method not found[ ' . $mtd . ' ]', '');
  } else {
    // すべてのチェックを通ったので、アクションを呼び出す
    $action = new $cls;
    $action->$mtd();
  }
} catch (Exception $e) {
  // エラーメッセージ
  if (isset($php_errormsg)) {
    Logger::logs(ERROR, $php_errormsg);
  }
  Logger::logs(ERROR, $e->getMessage(), $e->getFile());
  header("HTTP/1.0 500 Internal Server Error");
}
