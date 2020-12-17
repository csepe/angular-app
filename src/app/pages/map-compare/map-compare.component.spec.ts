import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCompareComponent } from './map-compare.component';

describe('MapCompareComponent', () => {
  let component: MapCompareComponent;
  let fixture: ComponentFixture<MapCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
