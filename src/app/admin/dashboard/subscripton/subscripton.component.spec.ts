import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptonComponent } from './subscripton.component';

describe('SubscriptonComponent', () => {
  let component: SubscriptonComponent;
  let fixture: ComponentFixture<SubscriptonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptonComponent]
    });
    fixture = TestBed.createComponent(SubscriptonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
