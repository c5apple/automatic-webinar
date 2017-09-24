import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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

  /** ログイン状態か */
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.authenticated();
      }
    });
  }

  /**
   * ログアウト
   */
  logout() {
    this.authService.logout().subscribe(ret => {
      this.router.navigate(['/']);
    }, (error) => {
      this.router.navigate(['/']);
    });
  }
}
