import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorClassComponent } from './selector-role.component';

describe('SelectorClassComponent', () => {
  let component: SelectorClassComponent;
  let fixture: ComponentFixture<SelectorClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorClassComponent],
    });
    fixture = TestBed.createComponent(SelectorClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
