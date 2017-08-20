import { Component, OnInit } from '@angular/core';

/**
 * 確認ダイアログ
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  /** タイトル */
  title: string;
  /** メッセージ */
  message: string;

  /** ボタン色 */
  color: string;

  constructor() { }

  ngOnInit() {
  }
}
