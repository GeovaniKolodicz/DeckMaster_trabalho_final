import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

import { CartaEdicaoService } from '../../services/carta-edicao.service';
import { ICarta } from '@nx-monorepo/comum';
import { AuthService } from '@nx-monorepo/auth';

@Component({
  selector: 'app-form-carta',
  templateUrl: './form-carta.component.html',
  styleUrl: './form-carta.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    AsyncPipe,
  ],
})
export class FormCartaComponent implements OnInit {


  public authService = inject(AuthService);

  @Input({
    required: true,
  })
  public set id(value: string) {
    this.formGroup.controls['_id'].setValue(+(value || '0'));
  }
  public get id(): string {
    return `${this.formGroup.controls['_id'].value || ''}`;
  }

  private fb = inject(FormBuilder);
  public formGroup = this.fb.group({
    _id: 0,
    naipe: ['', Validators.required],
    caracter: ['', Validators.required],
  });

  public Caracter: String[] = [
    'Q', 'J', 'K','A', '2', '3','4', '5', '6', '7', '8', '9','10'
  ]
  public Naipes: String [] =[
    '♠️', '♥️', '♣️','♦️'
  ];

  public cartaEdicaoService = inject(CartaEdicaoService);
  private router = inject(Router);

  public enviar(): void {
    const carta = this.formGroup.value as ICarta; // Casting.
    if (carta._id) {
      // Editar carta:
      this.cartaEdicaoService.put(carta).subscribe(
        cartaGravado => {
          this.router.navigate(['/']);
        },
      );
    } else {
      // Novo carta:
      this.cartaEdicaoService.post(carta).subscribe(
        cartaGravado => {
          this.router.navigate(['/']);
        }
      )
    }
  }
  public excluir(): void {
    const carta = this.formGroup.value as ICarta;
      this.cartaEdicaoService.delete(carta).subscribe(
        cartaGravado => {
          this.router.navigate(['/']);
        },
      );
  }

  public ngOnInit(): void {
    // Se estiver editando um registro:
    if (this.id) {
      // Recupera os dados iniciais do formulário:
      this.cartaEdicaoService.get(+this.id).subscribe(
        carta => {
          this.formGroup.setValue(carta);
        },
      );
    }
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
