import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  listaCategoria: Categoria[]
  nome: string
  mensagem: string


  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(){
    this.nome = this.route.snapshot.params['nome']
    this.buscarCategorias()

    this.location.onUrlChange( (url: string, state: unknown) => {
      this.nome = url.slice(10, )
      this.mensagem = ''
      this.listaCategoria = []
      this.buscarCategorias()
    })
  }

  buscarCategorias(){
    if(this.nome == 'Aldeias' || this.nome == 'Camping' || this.nome == 'Litoral' || this.nome == 'Rural' || this.nome == 'Urbano') {
      this.getAllCategoriasTipo()
      }
      else if (this.nome == 'Norte' || this.nome == 'Nordeste' || this.nome == 'Sul' || this.nome == 'Sudeste' || this.nome == 'Centro-Oeste'){
        this.getAllCategoriasRegiao()
      }
      else if (this.nome == 'sustentavel') {
        this.getAllCategoriasPrioridade()
        this.nome = 'Passeio Sustentável'
      }
  }

  getAllCategorias(){
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[]) => {
      if(resp!=null){
      this.listaCategoria = resp
      } else {
        this.mensagem = "Sem passeios para esta categoria!"
      }
    })
  }

  getAllCategoriasTipo(){
    this.categoriaService.getAllCategoriasByTipo(this.nome).subscribe((resp: Categoria[]) => {
      if(resp!=null){
        this.listaCategoria = resp
        } else {
          this.mensagem = "Sem passeios para esta categoria!"
        }
    })
  }

  getAllCategoriasRegiao(){
    this.categoriaService.getAllCategoriasByRegiao(this.nome).subscribe((resp: Categoria[]) => {
      if(resp!=null){
        this.listaCategoria = resp
        } else {
          this.mensagem = "Sem passeios para esta categoria!"
        }
    })
  }

  getAllCategoriasPrioridade(){
    this.categoriaService.getAllCategoriasByPrioridade(this.nome).subscribe((resp: Categoria[]) => {
      if(resp!=null){
        this.listaCategoria = resp
        } else {
          this.mensagem = "Sem passeios para esta categoria!"
        }
    })
  }

}
