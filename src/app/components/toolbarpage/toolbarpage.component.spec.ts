import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarpageComponent } from './toolbarpage.component';

describe('ToolbarpageComponent', () => {
  let component: ToolbarpageComponent;
  let fixture: ComponentFixture<ToolbarpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
