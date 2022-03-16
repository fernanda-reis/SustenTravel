import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class EditUsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getUserById(id:number){
    return this.http.get<Usuario>(`https://projeto-integrador-08.herokuapp.com/usuario/${id}`, this.token)
  }
  
  alterarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>("https://projeto-integrador-08.herokuapp.com/usuario", usuario, this.token)
  }
}
