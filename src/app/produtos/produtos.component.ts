import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  listaCategoria: Categoria[]
  listaCategoriaTipo: Categoria[]
  tipo: string
  listaCategoriaRegiao: Categoria[]
  regiao: string
  listaCategoriaPrioridade: Categoria[]
  prioridade: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
  }

  getAllCategorias(){
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  getAllCategoriasTipo(){
    this.categoriaService.getAllCategoriasByTipo(this.tipo).subscribe((resp: Categoria[]) => {
      this.listaCategoriaTipo = resp
    })
  }

  getAllCategoriasRegiao(){
    this.categoriaService.getAllCategoriasByRegiao(this.regiao).subscribe((resp: Categoria[]) => {
      this.listaCategoriaRegiao = resp
    })
  }

  getAllCategoriasPrioridade(){
    this.categoriaService.getAllCategoriasByPrioridade(this.prioridade).subscribe((resp: Categoria[]) => {
      this.listaCategoriaPrioridade = resp
    })
  }

  
}
