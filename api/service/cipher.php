<?php

/**
 * 暗号化
 */
class Cipher {

  /**
   * 暗号化
   *
   * @param string $str 対象文字列(暗号化前)
   * @return string 暗号化後文字列
   */
  static function encrypt($str) {
    return password_hash($str, PASSWORD_BCRYPT); // PHP7.0.0ではオプション非推奨
  }

  /**
   * 検証
   *
   * @param string $str 対象文字列(暗号化前)
   * @param string $encrypted 暗号化後文字列
   * @return boolean
   */
  static function verify($str, $encrypted) {
    return password_verify($str, $encrypted);
  }

}
