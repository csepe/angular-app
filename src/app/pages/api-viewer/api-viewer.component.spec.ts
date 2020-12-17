import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiViewerComponent } from './api-viewer.component';

describe('ApiViewerComponent', () => {
  let component: ApiViewerComponent;
  let fixture: ComponentFixture<ApiViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
