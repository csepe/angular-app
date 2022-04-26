import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontViewerComponent } from './font-viewer.component';

describe('FontViewerComponent', () => {
  let component: FontViewerComponent;
  let fixture: ComponentFixture<FontViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FontViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
