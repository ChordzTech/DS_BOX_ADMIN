import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppConfigComponent } from './edit-app-config.component';

describe('EditAppConfigComponent', () => {
  let component: EditAppConfigComponent;
  let fixture: ComponentFixture<EditAppConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAppConfigComponent]
    });
    fixture = TestBed.createComponent(EditAppConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
