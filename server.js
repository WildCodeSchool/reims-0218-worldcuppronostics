const express = require("express")
const app = express()

app.use(express.static("public"))

const html = `
<!doctype html>
<html class="no-js" lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Pronostics World Cup</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <body>
    <a href='/matchs/new'>New Match</a>
    <div id="main">
    </div>
    <script src="page.js"></script>
    <script src="app.js"></script>
  </body>
</html>`

app.get("/matchs", (req, res) => {
  //console.log("matchs powa")
  const matchs = [
    {
      teamHome: "France",
      teamOut: "Egypte",
      scoreTeamHome: 10,
      scoreTeamOut: 1,
      hours: "20:45",
      localisation: "Moscou"
    },
    {
      teamHome: "France",
      teamOut: "Egypte",
      scoreTeamHome: 10,
      scoreTeamOut: 1,
      hours: "20h40",
      localisation: "Moscou"
    },
  ]
  res.json(matchs)
})

// app.get("/matchs/new",(req, res) => {
//   console.log("vous etes dans matchs/new")
//   res.send(html) 
//   res.end()
// })

app.get("*", (req, res) => {
  res.send(html)
  res.end()
})


app.listen(8000)
