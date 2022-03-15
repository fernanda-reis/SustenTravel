import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent implements OnInit {
  nome: string;
  txt_nome: Element;
  nomeOk = false;

  email: string;
  txt_email: Element;
  emailOk = false;

  tel: string;
  txt_tel: Element;
  telOk = false;

  mensagem: string;
  txt_mensagem: Element;
  contCaracteres: number;
  mensagemOk = false;

  constructor() {}

  ngOnInit() {}

  validarNome() {
    this.nome = (<HTMLInputElement>document.querySelector('#nome')).value;
    this.txt_nome = <HTMLDivElement>document.querySelector('#txt_nome');

    if (this.nome.length < 3) {
      this.txt_nome.innerHTML = 'Nome inválido';
      this.txt_nome.setAttribute('style', 'color:red');
      this.nomeOk = false;
    } else {
      this.txt_nome.innerHTML = '';
      this.nomeOk = true;
    }
  }

  validarEmail() {
    this.email = (<HTMLInputElement>document.querySelector('#email')).value;
    this.txt_email = <HTMLDivElement>document.querySelector('#txt_email');

    if (this.email.indexOf('@') == -1 || this.email.indexOf('.') == -1) {
      this.txt_email.innerHTML = 'Email inválido';
      this.txt_email.setAttribute('style', 'color:red');
      this.emailOk = false;
    } else {
      this.txt_email.innerHTML = '';
      this.emailOk = true;
    }
  }

  validarTel() {
    this.tel = (<HTMLInputElement>document.querySelector('#tel')).value;
    this.txt_tel = <HTMLDivElement>document.querySelector('#txt_tel');

    if (this.tel.length < 10) {
      this.txt_tel.innerHTML = 'Número inválido';
      this.txt_tel.setAttribute('style', 'color:red');
      this.telOk = false;
    } else {
      this.txt_tel.innerHTML = '';
      this.telOk = true;
    }
  }

  validarMensagem() {
    this.mensagem = (<HTMLInputElement>(
      document.querySelector('#mensagem')
    )).value;
    this.txt_mensagem = <HTMLDivElement>document.querySelector('#txt_mensagem');

    this.contCaracteres = this.mensagem.length;
    this.txt_mensagem.innerHTML = this.contCaracteres.toLocaleString();

    if (this.mensagem.length > 250) {
      this.txt_mensagem.innerHTML =
        this.contCaracteres +
        ' - Por favor diminua a quantidade de caracteres.';
      this.txt_mensagem.setAttribute('style', 'color:red');
      this.mensagemOk = false;
    } else {
      this.txt_mensagem.innerHTML = this.contCaracteres.toLocaleString();
      this.txt_mensagem.setAttribute('style', 'color:black');
      this.mensagemOk = true;
    }
  }

  enviar(){
      if (this.nomeOk && this.emailOk && this.mensagemOk) {
          alert('Mensagem enviada. Obrigade por entrar em contato!')
      } else {
          alert('Preencha o formulário corretamente.')
      }
  }
}
