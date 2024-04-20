import {
  HttpClient,
} from '@angular/common/http';
import {
  Injectable,
  inject,
} from '@angular/core';

import { Observable, shareReplay } from 'rxjs';

import { ICarta } from '@nx-monorepo/comum';

import { API_BASE } from '@nx-monorepo/auth';

@Injectable({
  providedIn: 'root',
})
export class CartaService {

  private httpClient = inject(HttpClient);
  private apiBase = inject(API_BASE);

  public getAll(): Observable<ICarta[]> {
    return this.httpClient.get<ICarta[]>(
      `${this.apiBase}/carta`,
    ).pipe(
      shareReplay(),
    );
  }

}
