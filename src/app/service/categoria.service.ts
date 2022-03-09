import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>("https://projeto-integrador-08.herokuapp.com/categoria")
  }

  getAllCategoriasByTipo(tipo: string):Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`https://projeto-integrador-08.herokuapp.com/categoria/tipo/${tipo}`)
  }

  getAllCategoriasByRegiao(regiao: string):Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`https://projeto-integrador-08.herokuapp.com/categoria/regiao/${regiao}`)
  }

  getAllCategoriasByPrioridade(prioridade: string):Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`https://projeto-integrador-08.herokuapp.com/categoria/prioridade/${prioridade}`)
  }

  getCategoriaById(id: number):Observable<Categoria>{
    return this.http.get<Categoria>(`https://projeto-integrador-08.herokuapp.com/categoria/${id}`)
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>('https://projeto-integrador-08.herokuapp.com/categoria', categoria, this.token)
  }

  putCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>('https://projeto-integrador-08.herokuapp.com/categoria', categoria, this.token)
  }

  deleteCategoria(id: number) {
    return this.http.delete(`https://projeto-integrador-08.herokuapp.com/categoria/${id}`, this.token)
  }
}


