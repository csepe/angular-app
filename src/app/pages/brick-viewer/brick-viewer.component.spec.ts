import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickViewerComponent } from './brick-viewer.component';

describe('BrickViewerComponent', () => {
  let component: BrickViewerComponent;
  let fixture: ComponentFixture<BrickViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrickViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
