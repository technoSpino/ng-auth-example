import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsecureComponent } from './unsecure.component';

describe('UnsecureComponent', () => {
  let component: UnsecureComponent;
  let fixture: ComponentFixture<UnsecureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsecureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
