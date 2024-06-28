import express from 'express'
import bodyParser from 'body-parser'
import exampleRoutes from '../routes/routes'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use('/', exampleRoutes)

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}....`)
})
