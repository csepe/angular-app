import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WavesGeneratorComponent } from './waves-generator.component';

describe('WavesGeneratorComponent', () => {
  let component: WavesGeneratorComponent;
  let fixture: ComponentFixture<WavesGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WavesGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WavesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
