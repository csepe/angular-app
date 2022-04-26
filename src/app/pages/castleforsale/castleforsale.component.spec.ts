import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastleforsaleComponent } from './castleforsale.component';

describe('CastleforsaleComponent', () => {
  let component: CastleforsaleComponent;
  let fixture: ComponentFixture<CastleforsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastleforsaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastleforsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
