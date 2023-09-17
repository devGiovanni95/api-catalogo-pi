import  express  from 'express'
import dotenv from 'dotenv'
import dataBase from './database/ormconfig'
import cors from 'cors'
import routes from './routes'
import exp from 'constants'
import swaggagerUi from 'swagger-ui-express'
import swaggerDocs from './documentation/swagger.json'

//ler o arquivo .env
dotenv.config()
//criar uma conexão
const app = express()

//pegar a porta definida no arquivo || se não vier o valor por falta.Ele coloca o valor 3000 
//const port = process.env.PORT || 3000
const port = process.env.PORT

app.use(cors()) // habilita o CORS
app.use(cors({
    origin: ['http://localhost:3000', '']
  }))

app.use(express.json())
app.use('/api-docs', swaggagerUi.serve, swaggagerUi.setup(swaggerDocs))
app.use(routes)

/*
//criando rotas de navegação
app.get('/', (requisicao, resposta) => {
    //quando efetua uma requisiçao ele mostra o corpo da requisição
    console.log(requisicao)
    //printa na tela
    resposta.send('Olá mundo')
})

//criando rotas de navegação
app.get('/user', (requisicao, resposta) => {
    //mostra no console
    resposta.send({id:1,name:"teste"})
})
*/

//comando para executar o servidor
app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
    console.log('Data Base is ', dataBase.isInitialized ? 'initialized' : 'not initialized')
})

/*
ou
const exec = ()={
    console.log()
}

app.listen(port, exec)
*/
