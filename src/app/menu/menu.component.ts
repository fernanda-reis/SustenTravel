import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome: string
  foto: string
  tipo: string

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  logado(){
    if(this.auth.logado()){
      this.nome = environment.nome
      this.foto = environment.foto
      this.tipo = environment.tipo
      return true
    } else {
      return false
    }
  }

  sair() {
    this.router.navigate(['/login'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.email = ''
    environment.tipo = ''
    environment.senha = ''
    environment.id = 0
  }

}
