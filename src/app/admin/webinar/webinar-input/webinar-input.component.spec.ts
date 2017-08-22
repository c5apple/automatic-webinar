import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { WebinarInputComponent } from './webinar-input.component';
import { MyMaterialModule } from 'shared/module';

describe('WebinarInputComponent', () => {
  let component: WebinarInputComponent;
  let fixture: ComponentFixture<WebinarInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MyMaterialModule
      ],
      declarations: [WebinarInputComponent]
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
