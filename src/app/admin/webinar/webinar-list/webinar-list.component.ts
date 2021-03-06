import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MdPaginator, MdDialog, MdDialogRef, MdSnackBar, MdSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { MyDatabase, MyDataSource } from 'shared/model';
import { WebinarService, LoadingService } from 'shared/service';
import { Webinar } from 'shared/interface';
import { ConfirmDialogComponent } from 'shared/component';
import { WebinarInputComponent } from '../webinar-input/webinar-input.component';

/**
 * ウェビナー一覧
 */
@Component({
  selector: 'app-webinar-list',
  templateUrl: './webinar-list.component.html',
  styleUrls: ['./webinar-list.component.scss']
})
export class WebinarListComponent implements OnInit {
  displayedColumns = ['checked', 'id', 'name', 'edit'];
  database: MyDatabase<Webinar>;
  dataSource: MyDataSource<Webinar> | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  /** すべて選択 */
  allChecked = false;

  constructor(
    private dialog: MdDialog,
    private snackBar: MdSnackBar,
    private router: Router,
    private loading: LoadingService,
    private webinarService: WebinarService
  ) { }

  ngOnInit() {
    this.database = new MyDatabase<Webinar>([]);
    this.dataSource = new MyDataSource<Webinar>(this.database, this.paginator);

    Observable.fromEvent(this.filter.nativeElement, 'change')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });

    // ウェビナーを検索する
    this.loading.setLoading(true);
    this.webinarService.getWebinar().subscribe((webinars: Webinar[]) => {
      this.loading.setLoading(false);

      if ('length' in webinars && 0 < webinars.length) {
        this.database.data = webinars;
      }
    }, (error) => {
      this.loading.setLoading(false);
      this.router.navigate(['/']);
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
   * ウェビナーを登録する
   */
  add(webinarId?: number) {
    const config = {
      width: '95%',
      height: '90%'
    };
    // ウェビナー登録ダイアログを表示
    const inputDialogRef: MdDialogRef<WebinarInputComponent> = this.dialog.open(WebinarInputComponent, config);
    inputDialogRef.componentInstance.webinarId = webinarId;
    inputDialogRef.afterClosed().subscribe((webinar: Webinar) => {
      if (!webinar) {
        return;
      }

      const message = webinarId ? 'ウェビナーの更新が完了しました' : 'ウェビナーの登録が完了しました';
      this.snackBar.open(message, undefined, { duration: 4000 });

      // 一覧更新
      if (webinarId) {
        this.database.data.find(w => w.id === webinarId).name = webinar.name;
      } else {
        console.log(this.database);
        this.database.add(webinar);
      }
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
    dialogRef.componentInstance.color = 'warn';
    dialogRef.afterClosed().subscribe((isOk: boolean) => {
      if (!isOk) {
        return;
      }
      // ウェビナーを削除する
      this.loading.setLoading(true);
      this.webinarService.deleteWebinar(webinarIds).subscribe(ret => {
        this.loading.setLoading(false);
        if (ret) {
          // リストから削除
          this.database.data = this.database.data.filter(w => webinarIds.indexOf(w.id) === -1);

          const snackBarRef: MdSnackBarRef<SimpleSnackBar> = this.snackBar.open('削除しました', undefined, { duration: 4000 });
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
    const body = this.database.data.map((webinar, index) => Object.values(new Webinar(webinar)).join(','));
    const data = Array.prototype.concat(header, body).join('\r\n');

    const blob = new Blob([this.encode(data)], { type: 'text/csv' });
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

  /**
   * UTF-8 -> SJIS
   * @param str
   */
  private encode(str: string) {
    // encoding.js
    var str_array = Encoding.stringToCode(str);
    var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
    var uint8_array = new Uint8Array(sjis_array);
    return uint8_array;
  };
}
