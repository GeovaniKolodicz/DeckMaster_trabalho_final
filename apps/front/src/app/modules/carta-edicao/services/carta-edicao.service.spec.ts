import { TestBed } from '@angular/core/testing';

import { CartaEdicaoService } from './carta-edicao.service';

describe('CartaEdicaoService', () => {

  let service: CartaEdicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(CartaEdicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
