import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MdPaginator, MdDialog, MdDialogRef, MdSnackBar, MdSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { MyDatabase, MyDataSource } from 'shared/model';
import { WebinarService } from 'shared/service';
import { Webinar } from 'shared/interface';
import { ConfirmDialogComponent } from 'shared/component';

/**
 * ウェビナー一覧
 */
@Component({
  selector: 'app-webinar-list',
  templateUrl: './webinar-list.component.html',
  styleUrls: ['./webinar-list.component.scss']
})
export class WebinarListComponent implements OnInit {
  displayedColumns = ['checked', 'id', 'name'];
  database: MyDatabase<Webinar>;
  dataSource: MyDataSource<Webinar> | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  /** すべて選択 */
  allChecked = false;

  constructor(
    private dialog: MdDialog,
    private snackBar: MdSnackBar,
    private webinarService: WebinarService
  ) { }

  ngOnInit() {
    // ウェビナーを検索する
    this.webinarService.getWebinar().subscribe((webinars: Webinar[]) => {
      console.log(webinars);
      if ('length' in webinars && 0 < webinars.length) {
        this.database = new MyDatabase<Webinar>(webinars);
        this.dataSource = new MyDataSource<Webinar>(this.database, this.paginator);

        Observable.fromEvent(this.filter.nativeElement, 'change')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          });
      }
    });
  }

  /**
   * すべて選択
   */
  clickAll() {
    this.database.data.forEach(w => {
      w['checked'] = !this.allChecked;
    });
  }

  /**
   * ウェビナーを削除する
   */
  delete() {
    const webinarIds = this.database.data.filter(w => w['checked']).map(w => w.id);
    if (webinarIds.length === 0) {
      return;
    }

    // 確認ダイアログ
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = `${webinarIds.length}件 削除します`;
    dialogRef.componentInstance.message = 'よろしいですか？';
    dialogRef.afterClosed().subscribe((isOk: boolean) => {
      if (!isOk) {
        return;
      }
      // ウェビナーを削除する
      this.webinarService.deleteWebinar(webinarIds).subscribe(ret => {
        if (ret) {
          // リストから削除
          this.database.data = this.database.data.filter(w => webinarIds.indexOf(w.id) === -1);

          const snackBarRef: MdSnackBarRef<SimpleSnackBar> = this.snackBar.open('削除しました', '元に戻す', { duration: 3000 });
          snackBarRef.onAction().subscribe(() => {
            // TODO リストアAPI
          });
        }
      });
    });
  }

  /**
   * CSVダウンロード
   */
  downloadCsv() {
    if (this.database.data.length === 0) {
      return;
    }
    const header = [Object.keys(this.database.data[0]).join(',')];
    const body = this.database.data.map((webinar, index) => Object.values(webinar).join(','));
    const data = Array.prototype.concat(header, body).join('\r\n');

    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, 'webinar.csv');
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'webinar.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

}
