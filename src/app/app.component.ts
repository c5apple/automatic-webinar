import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  containerHeight: string;

  constructor() {
    this.setContainerHeight();
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
}
