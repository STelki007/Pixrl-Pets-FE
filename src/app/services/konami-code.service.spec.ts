import { TestBed } from '@angular/core/testing';

import { KonamiCodeService } from './konami-code.service';

describe('KonamiCodeService', () => {
  let service: KonamiCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonamiCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
