import { Produto } from "./Produto"

export class Usuario{

    public id: number
    public nome: string
    public emailContato: string
    public senha: string
    public telContato: string
    public foto: string
    public tipo: string
    public produtos: Produto[]

}