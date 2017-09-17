import { TestBed, inject } from '@angular/core/testing';

import { OptService } from './opt.service';

describe('OptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptService]
    });
  });

  it('should be created', inject([OptService], (service: OptService) => {
    expect(service).toBeTruthy();
  }));
});
