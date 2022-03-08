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


  user: Usuario = new Usuario();
  emailUser = environment.email;


  produtoEdit: Produto = new Produto();
  categoriaEdit: Categoria = new Categoria();

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.authService.refreshToken();
    this.findByEmailUser();
  }

  findProdutoById(id: number){
    this.produtoService.getProdutoById(id).subscribe((resp:Produto[]) => {
      this.produtoEdit = resp[0];
    })
  }

  findByEmailUser() {
    this.authService
      .getByEmailUser(this.emailUser)
      .subscribe((resp: Usuario) => {
        this.user = resp;
        console.log(this.user);
      });
  }

   cadastrarCategoria () {
    this.categoriaService
      .postCategoria(this.categoria)
      .subscribe((resp: Categoria) => {
        this.categoria = resp;
      });

      alert('Categoria cadastrada com sucesso!');

  }

  cadastrarProduto() {
    console.log(this.produto);
    console.log(this.categoria);

    this.user.emailContato = this.emailUser;
    this.produto.usuario = this.user;

    this.produto.categoria = this.categoria;
    console.log(this.produto);

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;
    });



    alert('Produto cadastrado com sucesso!');
    this.produto = new Produto();
    this.categoria = new Categoria();
  }

  //editarProduto

  //deletarProduto
}
