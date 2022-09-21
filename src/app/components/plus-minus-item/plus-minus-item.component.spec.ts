import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusMinusItemComponent } from './plus-minus-item.component';

describe('PlusMinusItemComponent', () => {
  let component: PlusMinusItemComponent;
  let fixture: ComponentFixture<PlusMinusItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlusMinusItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusMinusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
