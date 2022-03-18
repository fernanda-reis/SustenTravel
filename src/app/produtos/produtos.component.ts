import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';
import { Location } from '@angular/common';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  listaCategoria: Categoria[];
  listaProduto: Produto[];
  categoria: Categoria = new Categoria();
  nome: string;
  mensagem: string;

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.nome = this.route.snapshot.params['nome'];
    this.buscarCategorias();

    this.location.onUrlChange((url: string, state: unknown) => {
      this.nome = url.slice(10);
      this.mensagem = '';
      this.listaCategoria = [];
      this.buscarCategorias();
    });
  }

  buscarCategorias() {
    if (
      this.nome == 'Aldeias' ||
      this.nome == 'Radical' ||
      this.nome == 'Litoral' ||
      this.nome == 'Rural' ||
      this.nome == 'Urbano'
    ) {
      this.getAllCategoriasTipo();
    } else if (
      this.nome == 'Norte' ||
      this.nome == 'Nordeste' ||
      this.nome == 'Sul' ||
      this.nome == 'Sudeste' ||
      this.nome == 'Centro-Oeste'
    ) {
      this.getAllCategoriasRegiao();
    } else if (this.nome == 'sustentavel') {
      this.getAllCategoriasPrioridade();
      this.nome = 'Passeio Sustentável';
    } else if (this.nome == 'todos'){
      this.getAllCategorias()
      this.nome = 'Todos os Passeios';
    }
  }

  getAllCategorias() {
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[]) => {
      if (resp != null) {
        this.listaCategoria = resp;
      } else {
        this.mensagem = 'Sem passeios para esta categoria!';
      }
    });
  }

  getAllCategoriasTipo() {
    this.categoriaService
      .getAllCategoriasByTipo(this.nome)
      .subscribe((resp: Categoria[]) => {
        if (resp != null) {
          this.listaCategoria = resp;
        } else {
          this.mensagem = 'Sem passeios para esta categoria!';
        }
      });
  }

  getAllCategoriasRegiao() {
    this.categoriaService
      .getAllCategoriasByRegiao(this.nome)
      .subscribe((resp: Categoria[]) => {
        if (resp != null) {
          this.listaCategoria = resp;
        } else {
          this.mensagem = 'Sem passeios para esta categoria!';
        }
      });
  }

  getAllCategoriasPrioridade() {
    this.categoriaService
      .getAllCategoriasByPrioridade(this.nome)
      .subscribe((resp: Categoria[]) => {
        if (resp != null) {
          this.listaCategoria = resp;
        } else {
          this.mensagem = 'Sem passeios para esta categoria!';
        }
      });
  }

  busca(nome: string) {
    this.listaCategoria = [];

    this.produtoService
      .getAllProdutosByNome(nome)
      .subscribe((resp: Produto[]) => {
        if (resp.length > 0) {
          this.listaProduto = resp;

          this.listaProduto.forEach((produto) => {
            this.categoriaService
              .getCategoriaById(produto.categoria.idCategoria)
              .subscribe((resp: Categoria) => {
                this.categoria = resp;
                this.listaCategoria.push(this.categoria);
              });
          });
          this.mensagem = '';
        } else {
          this.mensagem = 'Não encontramos passeios com este nome!';
        }
      });
  }

  limpa(nome: string) {
    if (nome == '') {
      this.mensagem = ''
      this.ngOnInit();
    }
  }
}
