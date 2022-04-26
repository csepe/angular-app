import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtApiComponent } from './yt-api.component';

describe('YtApiComponent', () => {
  let component: YtApiComponent;
  let fixture: ComponentFixture<YtApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YtApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YtApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
