import {
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { IUsuarioESenha } from '@nx-monorepo/comum';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  public formGroup = this.fb.group({
    login: ['', Validators.required],
    senha: ['', Validators.required],
  });

  public envia(): void {
    const iUsuarioESenha = this.formGroup.value as IUsuarioESenha;
    this.authService.login(iUsuarioESenha).subscribe({
      next: usuarioLogado => {
        console.log('Logou com sucesso', usuarioLogado);
        this.router.navigate(['/']);
      },
      error: error => {
        console.error('Ocorreu um erro no login', error);
      },
    });
  }

}
