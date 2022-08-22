import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeureEditComponent } from './heure-edit.component';

describe('HeureEditComponent', () => {
  let component: HeureEditComponent;
  let fixture: ComponentFixture<HeureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeureEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
