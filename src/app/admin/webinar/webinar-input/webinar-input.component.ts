import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { WebinarInputForm } from './webinar-input-form';
import { WebinarService } from 'shared/service';
import { Webinar } from 'shared/interface';

/**
 * ウェビナー登録
 */
@Component({
  selector: 'app-webinar-input',
  templateUrl: './webinar-input.component.html',
  styleUrls: ['./webinar-input.component.scss']
})
export class WebinarInputComponent implements OnInit {

  /** ウェビナーID */
  @Input() webinarId: number;

  /** 入力フォーム */
  form: FormGroup;

  /** APIエラー */
  isError: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MdDialogRef<WebinarInputComponent>,
    private formBuilder: FormBuilder,
    private webinarService: WebinarService,
  ) {
    this.form = this.formBuilder.group(WebinarInputForm.validators);
  }

  ngOnInit() {
    // Input
    if (this.webinarId) {
      this.getWebinar(this.webinarId);
    } else {
      // クエリパラメータ
      this.route.params.subscribe(params => {
        if (params['webinarId'] !== undefined && !isNaN(+params['webinarId'])) {
          this.webinarId = +params['webinarId'];
          this.getWebinar(this.webinarId);
        }
      });
    }
  }

  /**
   * ウェビナーを取得する
   * @param webinarId ウェビナーID
   */
  getWebinar(webinarId: number) {
    this.webinarService.getWebinar(webinarId).subscribe((webinar: Webinar) => {
      Object.entries(webinar).forEach(w => {
        this.form.controls[w[0]].setValue(w[1]);
      });
    }, (error) => {
      this.dialogRef.close();
      this.router.navigate(['/']);
    });
  }

  /**
   * 登録ボタン
   * @param form 入力フォーム
   * @param isValid 有効か
   */
  onSubmit(form: WebinarInputForm, isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.isError = false;

    // ウェビナー登録
    form.id = this.webinarId;
    this.webinarService.saveWebinar(form).subscribe(webinarId => {
      if (webinarId && !isNaN(+webinarId)) {
        // 登録完了
        form.id = webinarId;
        this.dialogRef.close(form);
      } else {
        this.isError = true;
      }
    }, (error) => {
      this.dialogRef.close();
      this.router.navigate(['/']);
    });
  }
}
