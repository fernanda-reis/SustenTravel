import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private http: HttpClient

  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken() {
      this.token = {
        headers: new HttpHeaders().set('Authorization', environment.token)
      }
  }

  getByEmailUser(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `https://projeto-integrador-08.herokuapp.com/usuario/email/${email}`, this.token
    );
  }

    entrar(userLogin: UserLogin): Observable<UserLogin> {
      return this.http.post<UserLogin>("https://projeto-integrador-08.herokuapp.com/usuario/logar", userLogin)

    }

    cadastrar(usuario: Usuario): Observable<Usuario>{
      return this.http.post<Usuario>("https://projeto-integrador-08.herokuapp.com/usuario/cadastrar" , usuario)

    }


}
