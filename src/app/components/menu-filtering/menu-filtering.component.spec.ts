import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFilteringComponent } from './menu-filtering.component';

describe('MenuFilteringComponent', () => {
  let component: MenuFilteringComponent;
  let fixture: ComponentFixture<MenuFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFilteringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
