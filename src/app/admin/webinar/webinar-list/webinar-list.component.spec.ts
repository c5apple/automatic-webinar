import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { WebinarListComponent } from './webinar-list.component';
import { MyMaterialModule } from 'shared/module';
import { WebinarService, WebinarMockService } from 'shared/service';

describe('WebinarListComponent', () => {
  let component: WebinarListComponent;
  let fixture: ComponentFixture<WebinarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        MyMaterialModule
      ],
      declarations: [WebinarListComponent],
      providers: [
        { provide: WebinarService, useClass: WebinarMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
