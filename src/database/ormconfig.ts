import {DataSource} from 'typeorm'
import dotenv from 'dotenv'
import { join } from 'path';

//le o arquivo
dotenv.config();

const dataBase = new DataSource({
    // type: 'sqlite',
    type: 'postgres',
    url: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false, // Altere para true em produção, se você estiver usando um certificado válido
  // },
  ssl: false,
    // database: process.env.DATABASE || './src/database/database.sqlite',
//  database: process.env.DATABASE || './dist/database/database.sqlite',    
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