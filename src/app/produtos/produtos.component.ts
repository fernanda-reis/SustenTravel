import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
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
  nome: string


  constructor(
    private authService: AuthService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(){
    // if(environment.token == ''){
    //   this.router.navigate(['/login'])
    // }
    this.authService.refreshToken();
    this.nome = this.route.snapshot.params['nome']

    if(this.nome == 'Aldeias' || this.nome == 'Camping' || this.nome == 'Litoral' || this.nome == 'Rural' || this.nome == 'Urbano') {
    this.getAllCategoriasTipo()
    }
    else if (this.nome == 'Norte' || this.nome == 'Nordeste' || this.nome == 'Sul' || this.nome == 'Sudeste' || this.nome == 'Centro-Oeste'){
      this.getAllCategoriasRegiao()
    }
    else if (this.nome == 'sustentavel') {
      this.nome = 'Passeio Sustentável'
      this.getAllCategoriasPrioridade()
    }
  }

  getAllCategorias(){
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  getAllCategoriasTipo(){
    this.categoriaService.getAllCategoriasByTipo(this.nome).subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
      console.log(this.listaCategoria)
    })
  }

  getAllCategoriasRegiao(){
    this.categoriaService.getAllCategoriasByRegiao(this.nome).subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  getAllCategoriasPrioridade(){
    this.categoriaService.getAllCategoriasByPrioridade(this.nome).subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

}
