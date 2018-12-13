import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAddressComponent } from './payment-address.component';

describe('PaymentAddressComponent', () => {
  let component: PaymentAddressComponent;
  let fixture: ComponentFixture<PaymentAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
