import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCoreComponent } from './weather-core.component';

describe('WeatherCoreComponent', () => {
  let component: WeatherCoreComponent;
  let fixture: ComponentFixture<WeatherCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
