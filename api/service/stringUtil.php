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

}
