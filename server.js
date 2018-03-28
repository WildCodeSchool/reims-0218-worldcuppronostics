const express = require('express')
const app = express()
//const usersSeed = require('./public/pirates.json')
let db

app.use(express.static('public'))

const html = `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Pronostics World Cup</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <body>
    <div id="bloc_page">
    </div>
    <script src="page.js"></script>
    <script src="app.js"></script>
  </body>
</html>`

/*
app.post('/pirates', (req, res) => {
  return insertUser(req.body)
  .then(record => res.json(record))
})

app.get('/pirates', (req, res) => {
  db.all('SELECT * from users')
  .then(records => res.json(records))
})
*/

app.get('*', (req, res) => {
  res.send(html)
  res.end()
})

app.listen(8000)
