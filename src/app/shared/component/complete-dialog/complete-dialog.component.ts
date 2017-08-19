import { Component, OnInit } from '@angular/core';

/**
 * 確認ダイアログ
 */
@Component({
  selector: 'app-complete-dialog',
  templateUrl: './complete-dialog.component.html',
  styleUrls: ['./complete-dialog.component.scss']
})
export class CompleteDialogComponent implements OnInit {

  /** タイトル */
  title: string;
  /** メッセージ */
  message: string;

  constructor() { }

  ngOnInit() {
  }

}
