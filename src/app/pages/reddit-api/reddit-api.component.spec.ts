import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditApiComponent } from './reddit-api.component';

describe('RedditApiComponent', () => {
  let component: RedditApiComponent;
  let fixture: ComponentFixture<RedditApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedditApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
