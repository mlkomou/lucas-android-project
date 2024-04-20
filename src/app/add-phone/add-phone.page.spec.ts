import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPhonePage } from './add-phone.page';

describe('AddPhonePage', () => {
  let component: AddPhonePage;
  let fixture: ComponentFixture<AddPhonePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
