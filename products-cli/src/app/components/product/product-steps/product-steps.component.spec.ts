import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStepsComponent } from './product-steps.component';

describe('ProductStepsComponent', () => {
  let component: ProductStepsComponent;
  let fixture: ComponentFixture<ProductStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
