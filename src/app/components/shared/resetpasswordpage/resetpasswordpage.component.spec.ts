import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordpageComponent } from './resetpasswordpage.component';

describe('ResetpasswordpageComponent', () => {
  let component: ResetpasswordpageComponent;
  let fixture: ComponentFixture<ResetpasswordpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
