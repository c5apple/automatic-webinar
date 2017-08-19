import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarInputComponent } from './webinar-input.component';

describe('WebinarInputComponent', () => {
  let component: WebinarInputComponent;
  let fixture: ComponentFixture<WebinarInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebinarInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
