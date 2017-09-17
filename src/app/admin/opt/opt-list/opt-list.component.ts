import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MdPaginator, MdDialog, MdDialogRef, MdSnackBar, MdSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { MyDatabase, MyDataSource } from 'shared/model';
import { OptService, LoadingService } from 'shared/service';
import { Opt } from 'shared/interface';
import { ConfirmDialogComponent } from 'shared/component';
import { OptInputComponent } from '../opt-input/opt-input.component';

/**
 * オプト一覧
 */
@Component({
  selector: 'app-opt-list',
  templateUrl: './opt-list.component.html',
  styleUrls: ['./opt-list.component.scss']
})
export class OptListComponent implements OnInit {
  displayedColumns = ['checked', 'id', 'webinarId', 'mail', 'preferredDate', 'edit'];
  database: MyDatabase<Opt>;
  dataSource: MyDataSource<Opt> | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  /** すべて選択 */
  allChecked = false;

  constructor(
    private dialog: MdDialog,
    private snackBar: MdSnackBar,
    private router: Router,
    private loading: LoadingService,
    private optService: OptService
  ) { }

  ngOnInit() {
    // オプトを検索する
    this.loading.setLoading(true);
    this.optService.getOpt().subscribe((opts: Opt[]) => {
      this.loading.setLoading(false);

      if ('length' in opts && 0 < opts.length) {
        this.database = new MyDatabase<Opt>(opts);
        this.dataSource = new MyDataSource<Opt>(this.database, this.paginator);

        Observable.fromEvent(this.filter.nativeElement, 'change')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          });
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
    this.database.data.forEach(o => {
      o['checked'] = !this.allChecked;
    });
  }

  /**
   * オプトを登録する
   */
  add(optId?: number) {
    const config = {
      width: '95%',
      height: '90%'
    };
    // オプト登録ダイアログを表示
    const inputDialogRef: MdDialogRef<OptInputComponent> = this.dialog.open(OptInputComponent, config);
    inputDialogRef.componentInstance.optId = optId;
    inputDialogRef.afterClosed().subscribe((opt: Opt) => {
      if (!opt) {
        return;
      }

      const message = optId ? 'オプトの更新が完了しました' : 'オプトの登録が完了しました';
      this.snackBar.open(message, undefined, { duration: 4000 });

      // 一覧更新
      if (optId) {
        this.database.data.find(o => o.id === optId).mail = opt.mail;
      } else {
        this.database.add(opt);
      }
    });
  }

  /**
   * オプトを削除する
   */
  delete() {
    const optIds = this.database.data.filter(o => o['checked']).map(o => o.id);
    if (optIds.length === 0) {
      return;
    }

    // 確認ダイアログ
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = `${optIds.length}件 削除します`;
    dialogRef.componentInstance.message = 'よろしいですか？';
    dialogRef.componentInstance.color = 'warn';
    dialogRef.afterClosed().subscribe((isOk: boolean) => {
      if (!isOk) {
        return;
      }
      // オプトを削除する
      this.loading.setLoading(true);
      this.optService.deleteOpt(optIds).subscribe(ret => {
        this.loading.setLoading(false);
        if (ret) {
          // リストから削除
          this.database.data = this.database.data.filter(o => optIds.indexOf(o.id) === -1);

          const snackBarRef: MdSnackBarRef<SimpleSnackBar> = this.snackBar.open('削除しました', '元に戻す', { duration: 4000 });
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
    const body = this.database.data.map((opt, index) => Object.values(opt).join(','));
    const data = Array.prototype.concat(header, body).join('\r\n');

    const blob = new Blob([this.encode(data)], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, 'opt.csv');
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'opt.csv';
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
