import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaViewerComponent } from './mega-viewer.component';

describe('MegaViewerComponent', () => {
  let component: MegaViewerComponent;
  let fixture: ComponentFixture<MegaViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegaViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
