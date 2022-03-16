import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { EditUsuarioService } from '../service/edit-usuario.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css'],
})
export class EditUsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario();
  idUser: number;
  tipoUsuario: string;
  senha: string;

  constructor(
    private usuarioService: EditUsuarioService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == '') {
      alert('Sua sessão expirou! Faça o login novamente.');
      this.router.navigate(['/login']);
    }
    this.idUser = environment.id;
    this.authService.refreshToken();
    this.findByIdUser(this.idUser);
  }

  findByIdUser(id: number) {
    this.usuarioService.getUserById(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
      console.log(this.usuario);
    });
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  atualizar() {
    this.usuario.senha = this.senha;
    this.usuarioService.alterarUsuario(this.usuario).subscribe({
      next: (resp: Usuario) => {
        this.usuario = resp;
        alert('Dados atualizados com sucesso! Faça o login para continuar.');
        this.sair();
      },
      error: (erro) => {
        if (erro.status == 400) {
          alert('Senha incorreta! Tente novamente.');
        } else if (erro.status == 500) {
          alert('Confirme sua senha!');
        }
      },
    });
  }

  sair() {
    this.usuario = new Usuario();
    this.idUser = 0;
    this.tipoUsuario = '';
    this.senha = '';

    environment.token = '';
    environment.nome = '';
    environment.foto = '';
    environment.email = '';
    environment.tipo = '';
    environment.senha = '';
    environment.id = 0;

    this.router.navigate(['/login']);
  }
}
