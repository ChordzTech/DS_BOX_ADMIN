import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriptionFormComponent } from './edit-subscription-form.component';

describe('EditSubscriptionFormComponent', () => {
  let component: EditSubscriptionFormComponent;
  let fixture: ComponentFixture<EditSubscriptionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubscriptionFormComponent]
    });
    fixture = TestBed.createComponent(EditSubscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
