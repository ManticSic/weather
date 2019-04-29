import { TestBed } from '@angular/core/testing';

import { WeatherCoreService } from './weather-core.service';

describe('WeatherCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherCoreService = TestBed.get(WeatherCoreService);
    expect(service).toBeTruthy();
  });
});
