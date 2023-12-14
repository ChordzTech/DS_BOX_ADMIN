import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSubsUsersComponent } from './non-subs-users.component';

describe('NonSubsUsersComponent', () => {
  let component: NonSubsUsersComponent;
  let fixture: ComponentFixture<NonSubsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonSubsUsersComponent]
    });
    fixture = TestBed.createComponent(NonSubsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
