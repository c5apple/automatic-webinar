import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, LoadingService } from 'shared/service';
import { LoginForm } from './login-form';

/**
 * ログイン
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** 入力フォーム */
  form: FormGroup;

  /** ログイン失敗 */
  isInValid: boolean;
  /** APIエラー */
  isError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private router: Router,
    private service: AuthService
  ) {
    this.form = this.formBuilder.group(LoginForm.validators);
  }

  ngOnInit() {
  }

  /**
   * 登録ボタン
   * @param form 入力フォーム
   * @param isValid 有効か
   */
  onSubmit(form: LoginForm, isValid: boolean) {
    if (!isValid) {
      return;
    }
    this.isInValid = false;
    this.isError = false;
    this.loading.setLoading(true);

    // ログイン
    this.service.login(this.form.value).subscribe((ret: boolean) => {
      this.loading.setLoading(false);

      // ウェビナーメニュー画面へ
      this.router.navigate(['/a']);
    }, (error: Response) => {
      this.loading.setLoading(false);

      switch (error.status) {
        case 403:
          this.isInValid = true;
          break;
        case 500:
        default:
          this.isError = true;
          break;
      }
    });
  }
}
