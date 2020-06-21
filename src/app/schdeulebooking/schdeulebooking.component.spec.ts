import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchdeulebookingComponent } from './schdeulebooking.component';

describe('SchdeulebookingComponent', () => {
  let component: SchdeulebookingComponent;
  let fixture: ComponentFixture<SchdeulebookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchdeulebookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchdeulebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
