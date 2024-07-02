import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routers from './routes'

const app = express()
const port = 3000
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
