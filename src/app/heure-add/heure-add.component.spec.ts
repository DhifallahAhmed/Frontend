import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeureAddComponent } from './heure-add.component';

describe('HeureAddComponent', () => {
  let component: HeureAddComponent;
  let fixture: ComponentFixture<HeureAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeureAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
