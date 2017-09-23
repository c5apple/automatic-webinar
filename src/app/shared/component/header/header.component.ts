import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'shared/service/auth/auth.service';

/**
 * ヘッダー
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  /**
   * ログアウト
   */
  logout() {
    this.authService.logout().subscribe(ret => {
      this.router.navigate(['/']);
    });
  }
}
