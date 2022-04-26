import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFujiComponent } from './index-fuji.component';

describe('IndexFujiComponent', () => {
  let component: IndexFujiComponent;
  let fixture: ComponentFixture<IndexFujiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexFujiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFujiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
