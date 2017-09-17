import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialogRef } from '@angular/material';

import { OptInputForm } from './opt-input-form';
import { LoadingService, OptService } from 'shared/service';
import { Opt } from 'shared/interface';

/**
 * オプト登録
 */
@Component({
  selector: 'app-opt-input',
  templateUrl: './opt-input.component.html',
  styleUrls: ['./opt-input.component.scss']
})
export class OptInputComponent implements OnInit {

  /** オプトID */
  @Input() optId: number;

  /** 入力フォーム */
  form: FormGroup;

  /** APIエラー */
  isError: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MdDialogRef<OptInputComponent>,
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private optService: OptService,
  ) {
    this.form = this.formBuilder.group(OptInputForm.validators);
  }

  ngOnInit() {
    // Input
    if (this.optId) {
      this.getOpt(this.optId);
    } else {
      // クエリパラメータ
      this.route.params.subscribe(params => {
        if (params['optId'] !== undefined && !isNaN(+params['optId'])) {
          this.optId = +params['optId'];
          this.getOpt(this.optId);
        }
      });
    }
  }

  /**
   * オプトを取得する
   * @param optId オプトID
   */
  getOpt(optId: number) {
    this.loading.setLoading(true);
    this.optService.getOpt(optId).subscribe((opt: Opt) => {
      this.loading.setLoading(false);
      Object.entries(opt).forEach(o => {
        this.form.controls[o[0]].setValue(o[1]);
      });
    }, (error) => {
      this.loading.setLoading(false);
      this.dialogRef.close();
      this.router.navigate(['/']);
    });
  }

  /**
   * 登録ボタン
   * @param form 入力フォーム
   * @param isValid 有効か
   */
  onSubmit(form: OptInputForm, isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.isError = false;
    this.loading.setLoading(true);

    // オプト登録
    form.id = this.optId;
    this.optService.saveOpt(form).subscribe(optId => {
      this.loading.setLoading(false);

      if (optId && !isNaN(+optId)) {
        // 登録完了
        form.id = optId;
        this.dialogRef.close(form);
      } else {
        this.isError = true;
      }
    }, (error) => {
      this.loading.setLoading(false);
      this.dialogRef.close();
      this.router.navigate(['/']);
    });
  }
}
