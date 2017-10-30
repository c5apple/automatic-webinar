<?php

/**
 * 文字列ユーティリティ
 */
class StringUtil {

  /**
   * HTMLインジェクション対策
   */
  static function h($var) {
    if (is_array($var)) {
      return array_map('Common::h', $var);
    } else {
      return htmlspecialchars(mysql_escape_string(strip_tags($var)), ENT_QUOTES, 'UTF-8');
    }
  }

  /**
   * シングルクォートで囲って返す
   *
   * @param $val 文字列
   * @return '文字列'
   */
  static function toStr($val) {
    return '\'' . $val . '\'';
  }

  /**
   * データベース用日付に変換する
   *
   * @param $timestamp タイムスタンプ
   * @return string 'Y-m-d H:i:s'
   */
  static public function toDatabaseDate($timestamp = NULL) {
    if (is_null($timestamp)) {
      $timestamp = time();
    }
    return self::toStr(date('Y-m-d H:i:s', $timestamp));
  }

  /**
   * YYYYMMDDをDate型に変換する
   *
   * @param format フォーマット
   * @param $yyyymmdd
   * @return date
   */
  static public function formatYmd($format, $yyyymmdd) {
    if (!is_numeric($yyyymmdd)) {
      return date();
    }
    $ymd = self::left($yyyymmdd, 4) . '-' . mb_substr($yyyymmdd, 4, 2, 'UTF-8') . '-' . self::right($yyyymmdd, 2);
    return date($format, strtotime($ymd));
  }

  /**
   * Right関数
   *
   * 右からn文字を取得します。
   *
   * @param $str 文字列
   * @param $n 文字数
   */
  public static function right($str, $n) {
    return mb_substr($str, (($n) * (-1)), $n, 'UTF-8');
  }

  /**
   * Left関数
   *
   * 左からn文字を取得します。
   */
  public static function left($str, $n) {
    return mb_substr($str, 0, $n, 'UTF-8');
  }

  /**
   * シリアライズしつつエンコードします
   *
   * @param $var
   */
  public static function serialize($var) {
    return base64_encode(serialize($var));
  }

  /**
   * アンシリアライズしつつデコードします
   *
   * @param $var
   */
  public static function unserialize($var) {
    return unserialize(base64_decode($var));
  }

  /**
   * スネークケースをキャメルケースに変換します
   */
  public static function camelize($str) {
    return str_replace('_', '', lcfirst(ucwords($str, '_')));
  }

  /**
   * 連想配列のキーをキャメルケースに変換します
   */
  public static function camelizeArrayRecursive(array $arr) {
    $results = array();
    foreach ($arr as $key => $value) {
      if (is_array($value)) {
        $results[self::camelize($key)] = camelizeArrayRecursive($value);
      } else {
        $results[self::camelize($key)] = $value;
      }
    }
    return $results;
  }

  /**
   * キャメルケースをスネークケースに変換します
   */
  public static function snakize($str) {
    return strtolower(preg_replace('/[a-z]+(?=[A-Z])|[A-Z]+(?=[A-Z][a-z])/', '\0_', $str));
  }

  /**
   * 連想配列のキーをスネークケースに変換します
   */
  public static function snakizeArrayRecursive(array $arr) {
    $results = array();
    foreach ($arr as $key => $value) {
      if (is_array($value)) {
        $results[self::snakize($key)] = snakizeArrayRecursive($value);
      } else {
        $results[self::snakize($key)] = $value;
      }
    }
    return $results;
  }

}
