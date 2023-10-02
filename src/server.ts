import  express  from 'express'
import dotenv from 'dotenv'
import dataBase from './database/ormconfig'
import cors from 'cors'
import routes from './routes'


dotenv.config()
const app = express()

const port = process.env.PORT

app.use(cors({
    origin: ['http://localhost:3000', 'https://api-catalogo-pi.onrender.com']
  }))

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
    console.log('Data Base is ', dataBase.isInitialized ? 'initialized' : 'not initialized')
})