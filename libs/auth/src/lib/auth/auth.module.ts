import {
  InjectionToken,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { jwtInterceptor } from '../interceptors/jwt.interceptor';

export const API_BASE = new InjectionToken<string>('URL base da API');

@NgModule({
  declarations: [],
  providers: [
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
      ]),
    ),
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
