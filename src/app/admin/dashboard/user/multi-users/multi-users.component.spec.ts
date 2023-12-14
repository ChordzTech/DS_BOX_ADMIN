import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUsersComponent } from './multi-users.component';

describe('MultiUsersComponent', () => {
  let component: MultiUsersComponent;
  let fixture: ComponentFixture<MultiUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiUsersComponent]
    });
    fixture = TestBed.createComponent(MultiUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
