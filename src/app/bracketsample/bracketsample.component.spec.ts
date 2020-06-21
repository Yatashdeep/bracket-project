import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketsampleComponent } from './bracketsample.component';

describe('BracketsampleComponent', () => {
  let component: BracketsampleComponent;
  let fixture: ComponentFixture<BracketsampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BracketsampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketsampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
