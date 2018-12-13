import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdashComponent } from './clientdash.component';

describe('ClientdashComponent', () => {
  let component: ClientdashComponent;
  let fixture: ComponentFixture<ClientdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
