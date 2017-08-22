import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { WebinarService } from './webinar.service';

describe('WebinarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [WebinarService]
    });
  });

  it('should be created', inject([WebinarService], (service: WebinarService) => {
    expect(service).toBeTruthy();
  }));
});
