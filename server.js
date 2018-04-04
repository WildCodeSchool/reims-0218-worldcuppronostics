//chargement des modules
const sqlite = require("sqlite3")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
//chargement des fichiers dans public
const matchsSeed = require("./public/matchs.json")
// database
let db

//permet de servir les ressources statiques du dossier public
app.use(express.static("public"))
app.use(bodyParser.json())


//inserer un match
const insertMatch = m => {
  const { teamhome, teamout, scoreteamhome, scoreteamout, hours, localisation } = m
  return db.get("INSERT INTO matchs(teamhome, teamout, scoreteamhome, scoreteamout, hours, localisation) VALUES(?, ?, ?, ?, ?, ?)", teamhome, teamout, scoreteamhome, scoreteamout, hours, localisation)
  .then(() => db.get("SELECT last_insert_rowid() as id"))
  .then(({ id }) => db.get("SELECT * from matchs WHERE id = ?", id))
}

//code qui remplit la db exemple
const dbPromise = Promise.resolve()
.then(() => sqlite.open("./database.sqlite", { Promise }))
.then( db => {
  db = _db
  return db.migrate({ force: "last" })
})  
  .then(() => Promise.map(matchsSeed, m => insertMatchs(m)))
  .then(() => {
    const testMatch = insertMatch({
      teamhome: "Espagne",
      teamout: "Belgique",
      scoreteamhome: 3,
      scoreteamout: 2,
      hours: "14h40",
      localisation: "Moscow"
    })
    console.log(testMatch)
  })


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
    <div id="main">
    </div>
    <script src="/page.js"></script>
    <script src="/app.js"></script>
  </body>
</html>`

//routing côté serveur

//routes de l'api REST qui répondent par du 

//READ
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

//route par défaut qui renvoie le code html/css/js complet de l'application
app.get("*", (req, res) => {
  // to test log du path
  res.send(html)
  res.end()
})


app.listen(8000)
