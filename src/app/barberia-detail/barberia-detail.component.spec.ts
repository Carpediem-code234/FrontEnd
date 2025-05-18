import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberiaDetailComponent } from './barberia-detail.component';

describe('BarberiaDetailComponent', () => {
  let component: BarberiaDetailComponent;
  let fixture: ComponentFixture<BarberiaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarberiaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberiaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
