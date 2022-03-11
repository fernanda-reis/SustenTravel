import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-meus-produtos',
  templateUrl: './meus-produtos.component.html',
  styleUrls: ['./meus-produtos.component.css'],
})
export class MeusProdutosComponent implements OnInit {
  produto: Produto = new Produto();
  categoria: Categoria = new Categoria();
  idCategoria: number;

  user: Usuario = new Usuario();
  emailUser = environment.email;

  produtoEdit: Produto = new Produto();
  categoriaEdit: Categoria = new Categoria();

  idProdutoDeletar: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == '') {
      alert('Sua sessão expirou! Faça o login novamente.');
      this.router.navigate(['/login']);
    }
    this.authService.refreshToken();
    this.findByEmailUser();
  }

  findProdutoById(idproduto: number) {
    this.produtoService.getProdutoById(idproduto).subscribe((resp: Produto) => {
      this.produtoEdit = resp;
    });
  }

  findCategoriaById(idcategoria: number) {
    this.categoriaService
      .getCategoriaById(idcategoria)
      .subscribe((resp: Categoria) => {
        this.categoriaEdit = resp;
      });
  }

  findByEmailUser() {
    this.authService
      .getByEmailUser(this.emailUser)
      .subscribe((resp: Usuario) => {
        this.user = resp;
      });
  }

  cadastrar() {
    this.categoriaService
      .postCategoria(this.categoria)
      .subscribe((resp: Categoria) => {
        this.categoria = resp;

        this.user.emailContato = this.emailUser;
        this.produto.usuario = this.user;

        this.produto.categoria = this.categoria;

        this.produtoService
          .postProduto(this.produto)
          .subscribe((resp2: Produto) => {
            this.produto = resp2;
            this.produto = new Produto();
            this.categoria = new Categoria();
            alert('Passeio cadastrado com sucesso!');
            this.findByEmailUser();
          });
      });

  }

  atualizar() {
    this.produtoService
      .putProduto(this.produtoEdit)
      .subscribe((resp: Produto) => {
        this.produtoEdit = resp;
      });

    this.categoriaService
      .putCategoria(this.categoriaEdit)
      .subscribe((resp2: Categoria) => {
        this.categoriaEdit = resp2;
        this.categoriaEdit = new Categoria()
        this.produtoEdit = new Produto()

      });
      alert('Produto atualizado com sucesso!');
      this.findByEmailUser();
  }

  atribuirId(id: number) {
    this.idProdutoDeletar = id;
  }

  deletar() {
    this.categoriaService
      .deleteCategoria(this.idProdutoDeletar)
      .subscribe(() => {
        alert('Produto apagado com sucesso!');
        this.findByEmailUser();
      });
  }
}
