import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMovie } from './register-movie';

describe('RegisterMovie', () => {
  let component: RegisterMovie;
  let fixture: ComponentFixture<RegisterMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterMovie],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterMovie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
