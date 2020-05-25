import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTreatmentComponent } from './start-treatment.component';

describe('StartTreatmentComponent', () => {
  let component: StartTreatmentComponent;
  let fixture: ComponentFixture<StartTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
