import  express  from 'express'
import dotenv from 'dotenv'
import dataBase from './database/ormconfig'
import cors from 'cors'
import routes from './routes'
import swaggagerUi from 'swagger-ui-express'
import swaggerDocs from './documentation/swagger.json'


dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors({
    origin: ['http://localhost:3000', '']
  }))

app.use(express.json())
app.use('/api-docs', swaggagerUi.serve, swaggagerUi.setup(swaggerDocs))
app.use(routes)

app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
    console.log('Data Base is ', dataBase.isInitialized ? 'initialized' : 'not initialized')
})

