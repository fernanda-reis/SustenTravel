import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
  }

  entrar() {

    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: UserLogin) => {
        this.userLogin = resp;

        environment.token = this.userLogin.token;
        environment.email = this.userLogin.email;
        environment.tipo = this.userLogin.tipo;
        environment.nome = this.userLogin.nome;
        environment.foto = this.userLogin.foto;
        environment.id = this.userLogin.id;

        this.router.navigate(['/inicio'])

      },

      error: (erro) => {
        if (erro.status == 500) {
          alert('Usuario ou senha incorretos!')

        }
      }
    })
  }

}
