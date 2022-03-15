import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  div = (<HTMLDivElement>document.querySelector('#produto'))
  
  constructor() { }

  ngOnInit(): void {
  }

}
