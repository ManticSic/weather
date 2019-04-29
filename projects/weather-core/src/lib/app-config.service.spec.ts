import {TestBed} from '@angular/core/testing';

import {AppConfigService} from './app-config.service';

describe('AppConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    let storage: { [key: string]: string } = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key];
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      return storage[key] = value;
    });

    spyOn(localStorage, 'clear').and.callFake(() => {
      storage = {};
    })
  });

  it('should be created', () => {
    const service: AppConfigService = TestBed.get(AppConfigService);
    expect(service).toBeTruthy();
  });
});
