import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanemiHistoryComponent } from './loanemi-history.component';

describe('LoanemiHistoryComponent', () => {
  let component: LoanemiHistoryComponent;
  let fixture: ComponentFixture<LoanemiHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanemiHistoryComponent]
    });
    fixture = TestBed.createComponent(LoanemiHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
