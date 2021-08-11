import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMediaComponent } from './display-media.component';

describe('DisplayMediaComponent', () => {
  let component: DisplayMediaComponent;
  let fixture: ComponentFixture<DisplayMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayMediaComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
