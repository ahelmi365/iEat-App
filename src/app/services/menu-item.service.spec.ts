import { TestBed } from '@angular/core/testing';

import { MenuItemService } from './menu-items.service';

describe('MenuItemService', () => {
  let service: MenuItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
