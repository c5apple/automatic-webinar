import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteDialogComponent } from './complete-dialog.component';
import { MyMaterialModule } from 'shared/module';

describe('CompleteDialogComponent', () => {
  let component: CompleteDialogComponent;
  let fixture: ComponentFixture<CompleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MyMaterialModule
      ],
      declarations: [CompleteDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
