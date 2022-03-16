import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  usuario: Usuario = new Usuario();

  confirmarSenha: string;
  tipoUser: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUsuario(event: any) {
    this.tipoUser = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUser;

    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas');
    } else {
      if (this.usuario.foto == null) {
        this.usuario.foto = 'https://i.imgur.com/4hHXAxp.png';
      }
      this.authService.cadastrar(this.usuario).subscribe({
        next: (resp: Usuario) => {
          this.usuario = resp;
          this.router.navigate(['/login']);
          alert('Usuario cadastrado com sucesso! Faça o login para continuar.');
        },
        error: (erro) => {
          if (erro.status == 400) {
            alert('Dados inválidos! Tente novamente.');
          }
        },
      });
    }
  }
}
