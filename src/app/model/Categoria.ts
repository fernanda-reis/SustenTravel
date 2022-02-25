import { Produto } from "./Produto"

export class Categoria{

    public idCategoria: number
    public prioridade: string
    public regiao: string
    public tipo: string
    public produtos: Produto[]

}