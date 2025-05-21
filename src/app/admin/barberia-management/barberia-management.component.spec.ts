import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberiaManagementComponent } from './barberia-management.component';

describe('BarberiaManagementComponent', () => {
  let component: BarberiaManagementComponent;
  let fixture: ComponentFixture<BarberiaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarberiaManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberiaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
