import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppconfigFormComponent } from './edit-appconfig-form.component';

describe('EditAppconfigFormComponent', () => {
  let component: EditAppconfigFormComponent;
  let fixture: ComponentFixture<EditAppconfigFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAppconfigFormComponent]
    });
    fixture = TestBed.createComponent(EditAppconfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
