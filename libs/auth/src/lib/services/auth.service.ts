import {
  HttpClient,
} from '@angular/common/http';
import {
  Injectable,
  inject,
} from '@angular/core';

import { API_BASE } from '../auth/auth.module';
import { IUsuarioESenha, IUsuarioLogado } from '@nx-monorepo/comum';
import { Observable, ReplaySubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private apiBase = inject(API_BASE);

  private _jwt$ = new ReplaySubject<string | null>(1);
  public jwt$ = this._jwt$.asObservable();
  public logado$ = this.jwt$.pipe(
    map(jwtOrNull => jwtOrNull ? true : false),
  );

  constructor(
  ) {
    this._jwt$.next(this.jwt);
  }

  public get jwt(): string | null {
    return localStorage.getItem('jwt');
  }

  public login(usuario: IUsuarioESenha): Observable<IUsuarioLogado> {
    return this.httpClient.post<IUsuarioLogado>(
      `${this.apiBase}/auth/login`,
      usuario,
    ).pipe(
      tap(usuarioLogado => {
        localStorage.setItem('jwt', usuarioLogado.jwt);
        this._jwt$.next(usuarioLogado.jwt);
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    this._jwt$.next(null);
  }

}
