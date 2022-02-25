import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVendedorComponent } from './cadastrar-vendedor.component';

describe('CadastrarVendedorComponent', () => {
  let component: CadastrarVendedorComponent;
  let fixture: ComponentFixture<CadastrarVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarVendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
