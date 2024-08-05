import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routers from './routes'
import 'module-alias/register'

// moduleAlias.addAlias('@root', __dirname)
// moduleAlias.addAlias('@src', __dirname + '/src')
// moduleAlias.addAlias('@client', __dirname + '/src/client')

const app = express()
const port = 3001
app.use(cors())
app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

routers(app)

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}....`)
})
