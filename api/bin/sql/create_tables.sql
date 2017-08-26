DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'アカウントID',
  `login_id` varchar(32) NOT NULL COMMENT 'ログインID',
  `pass` varchar(255) NOT NULL COMMENT 'パスワード',
  `name` varchar(32) COMMENT 'アカウント名',
  `delete_flg` tinyint(1) DEFAULT '0' COMMENT '削除フラグ',
  `create_day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '作成日付',
  `create_user` int(11) NOT NULL COMMENT '作成ユーザ',
  `update_day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新日付',
  `update_user` int(11) NOT NULL COMMENT '更新ユーザ',
  PRIMARY KEY (`id`),
  KEY `login_id` (`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='アカウント'
;

DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `id` varchar(255) NOT NULL COMMENT 'セッションID',
  `account_id` int(11) NOT NULL COMMENT 'アカウントID',
  `limit_day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '有効期限',
  `delete_flg` tinyint(1) DEFAULT '0' COMMENT '削除フラグ',
  `create_day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '作成日付',
  `create_user` int(11) NOT NULL COMMENT '作成ユーザ',
  `update_day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新日付',
  `update_user` int(11) NOT NULL COMMENT '更新ユーザ',
  PRIMARY KEY (`id`),
  KEY `limit_day` (`limit_day`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='セッション'
;

DROP TABLE IF EXISTS `webinar`;
CREATE TABLE `webinar` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ウェビナーID',
  `name` varchar(60) NOT NULL COMMENT 'ウェビナー名',
  `delete_flg` tinyint(1) DEFAULT '0' COMMENT '削除フラグ',
  `create_day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '作成日付',
  `create_user` int(11) NOT NULL COMMENT '作成ユーザ',
  `update_day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新日付',
  `update_user` int(11) NOT NULL COMMENT '更新ユーザ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ウェビナー'
;

DROP TABLE IF EXISTS `opt`;
CREATE TABLE `opt` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `webinar_id` int(11) NOT NULL COMMENT 'ウェビナーID',
  `mail` varchar(254) NOT NULL COMMENT 'メールアドレス',
  `preferred_date` date NOT NULL COMMENT '希望日',
  `delete_flg` tinyint(1) DEFAULT '0' COMMENT '削除フラグ',
  `create_day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '作成日付',
  `create_user` int(11) NOT NULL COMMENT '作成ユーザ',
  `update_day` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新日付',
  `update_user` int(11) NOT NULL COMMENT '更新ユーザ',
  PRIMARY KEY (`id`),
  KEY `webinar_id` (`webinar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='オプト'
;
