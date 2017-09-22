import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  containerHeight: string;

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    this.setContainerHeight();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const titles: Array<string> = this.getTitle(router.routerState, router.routerState.root);
        const title = ((titles.length > 0) ? titles.pop() + ' - ' : '') + 'AutomaticWebinar';
        titleService.setTitle(title);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setContainerHeight();
  }

  setContainerHeight() {
    if (window.innerHeight) {
      // ヘッダーフッターの高さ、コンテナの余白を引いた数を最小の高さとする
      this.containerHeight = `calc(${window.innerHeight}px - 64px - 20px - 50px - 64px)`;
    }
  }

  /**
   * Routerタイトルを取得する。
   * @param state 状態
   * @param parent 親
   */
  private getTitle(state, parent): Array<string> {
    const data: Array<string> = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      // 再帰
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }

    return data;
  }
}
