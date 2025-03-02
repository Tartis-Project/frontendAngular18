import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesFormComponent } from './vehicles-form.component';

describe('VehiclesFormComponent', () => {
  let component: VehiclesFormComponent;
  let fixture: ComponentFixture<VehiclesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
