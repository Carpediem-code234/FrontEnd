import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistsManagementComponent } from './stylists-management.component';

describe('StylistsManagementComponent', () => {
  let component: StylistsManagementComponent;
  let fixture: ComponentFixture<StylistsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
