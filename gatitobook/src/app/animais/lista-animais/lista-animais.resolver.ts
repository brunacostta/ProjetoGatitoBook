import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, switchMap, take } from 'rxjs';
import { Animais } from '../animais';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { AnimaisService } from './../animais.service';

@Injectable({
  providedIn: 'root',
})
export class ListaAnimaisResolver implements Resolve<Animais> {
  constructor(
    private animaisService: AnimaisService,
    private usuarioService: UsuarioService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Animais> {
    return this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName);
      }),
      take(1)
    );
  }
}
