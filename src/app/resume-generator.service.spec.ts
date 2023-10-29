import { TestBed } from '@angular/core/testing';

import { ResumeGeneratorService } from './resume-generator.service';

describe('ResumeGeneratorService', () => {
  let service: ResumeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
