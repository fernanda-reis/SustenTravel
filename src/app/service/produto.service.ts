import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>("https://projeto-integrador-08.herokuapp.com/produto")
  }

  getAllProdutosByNome(nome: string):Observable<Produto[]>{
    return this.http.get<Produto[]>(`https://projeto-integrador-08.herokuapp.com/produto/nome/${nome}`)
  }

  getProdutoById(id: number):Observable<Produto>{
    return this.http.get<Produto>(`https://projeto-integrador-08.herokuapp.com/produto/${id}`)
  }

  postProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>('https://projeto-integrador-08.herokuapp.com/produto', produto, this.token)
  }

  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('https://projeto-integrador-08.herokuapp.com/produto', produto, this.token)
  }

  deleteProduto(id: number) {
    return this.http.delete(`https://projeto-integrador-08.herokuapp.com/produto/${id}`, this.token)
  }

}
