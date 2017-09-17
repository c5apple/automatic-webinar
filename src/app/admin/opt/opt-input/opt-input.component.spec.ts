import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptInputComponent } from './opt-input.component';

describe('OptInputComponent', () => {
  let component: OptInputComponent;
  let fixture: ComponentFixture<OptInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
