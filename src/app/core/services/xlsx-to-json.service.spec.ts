import { TestBed } from '@angular/core/testing';

import { XlsxToJsonService } from './xlsx-to-json.service';

describe('XlsxToJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XlsxToJsonService = TestBed.get(XlsxToJsonService);
    expect(service).toBeTruthy();
  });
});
