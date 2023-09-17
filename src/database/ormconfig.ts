import {DataSource} from 'typeorm'
import dotenv from 'dotenv'
import { join } from 'path';

//le o arquivo
dotenv.config();

const dataBase = new DataSource({
    type: 'sqlite',
    database: process.env.DATABASE || './src/database/database.sqlite',
    entities: [
      join(__dirname, '..', 'models/*.{ts,js}')
    ],
    logging: true,
    synchronize: true
  })

//devolve uma promessa ok/falha/fica rodando
dataBase.initialize()
.then(() => {
    console.log('Banco conectado com sucesso')
}).catch((erro)=>{
    console.log('Erro ao conectar no banco! ',erro)
})

export default dataBase