import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
