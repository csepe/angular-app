import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudapestMapComponent } from './budapest-map.component';

describe('BudapestMapComponent', () => {
  let component: BudapestMapComponent;
  let fixture: ComponentFixture<BudapestMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudapestMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudapestMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
