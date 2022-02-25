import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario

  confirmarSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    window.scroll(0,0)

  }

  confirmSenha(event: any) {

    this.confirmarSenha = event.target.value

  }  

  tipoUsuario(event: any) {

    this.tipoUser = event.target.value

  }

  cadastrar() {

    this.usuario.tipo = this.tipoUser

    if(this.usuario.senha != this.confirmarSenha) {
      alert("As senhas estão incorretas")}

      else {

        /*console.log(this.usuario.emailContato)
        console.log(this.usuario.foto)
        console.log(this.usuario.nome)
        console.log(this.usuario.senha)
        console.log(this.usuario.telContato)
        console.log(this.usuario.tipo)*/


          this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
            this.usuario = resp
            this.router.navigate(["/login"])
            alert('Usuario cadastrado com sucesso')
          })
      }
  }

}