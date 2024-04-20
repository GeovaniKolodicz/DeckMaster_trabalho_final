import {
  Injectable,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, share } from 'rxjs';

import { ICarta } from '@nx-monorepo/comum';

import { API_BASE } from '@nx-monorepo/auth';

@Injectable({
  providedIn: 'root',
})
export class CartaEdicaoService {

  private httpClient = inject(HttpClient);
  private apiBase = inject(API_BASE);

  public get(id: number): Observable<ICarta> {
    return this.httpClient.get<ICarta>(
      `${this.apiBase}/carta/${id}`,
    );
  }

  public put(carta: ICarta): Observable<ICarta> {
    const req$ = this.httpClient.put<ICarta>(
      `${this.apiBase}/carta/${carta._id}`,
      carta,
    ).pipe(
      share(),
    );
    req$.subscribe();

    return req$;
  }

  public post(carta: ICarta): Observable<ICarta> {
    const req$ = this.httpClient.post<ICarta>(
      `${this.apiBase}/carta/`,
      carta,
    ).pipe(
      share(),
    );

    req$.subscribe();

    return req$;
  }

}
