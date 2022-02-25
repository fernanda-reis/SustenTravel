import { Categoria } from "./Categoria"
import { Usuario } from "./Usuario"

export class Produto {

    public idProduto: number
    public nomeProduto: string
    public valor: number
    public descricao: string
    public urlImagem: string
    public usuario: Usuario
    public categoria: Categoria
}