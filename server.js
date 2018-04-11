//chargement des modules
const sqlite = require("sqlite")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const Promise = require("bluebird")
//chargement des fichiers dans public
const matchsSeed = require("./public/matchs.json")
// database
let db

//permet de servir les ressources statiques du dossier public
app.use(express.static("public"))
app.use(bodyParser.json())

//inserer un match
const insertMatchs = m => {
  const { teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation } = m
  return db.get("INSERT INTO matchs(teamHome, teamOut,scoreTeamHome, scoreTeamOut, hours, localisation) VALUES(?, ?, ?, ?, ?, ?)", teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation)
    .then(() => db.get("SELECT last_insert_rowid() as id")) //on récupère le dernier enregistrement
    .then(({ id }) => db.get("SELECT * from matchs WHERE id = ?", id))
}

//inserer un wilder
const insertWilders = w => {
const { nom, prenom, pseudo, mail, motdepasse, city, equipepreferee } = w
  return db.get("INSERT INTO wilders(nom, prenom, pseudo, mail, motdepasse, city, equipepreferee) VALUES(?, ?, ?, ?, ?, ?, ?)", nom, prenom, pseudo, mail, motdepasse, city, equipepreferee)
    .then(() => db.get("SELECT last_insert_rowid() as id"))
    .then(({ id }) => db.get("SELECT * from wilders WHERE id = ?", id))
}
//code qui remplit la db exemple
const dbPromise = Promise.resolve()
  .then(() => sqlite.open("./database.sqlite", { Promise }))
  .then(_db => {
    db = _db
    return db.migrate({ force: "last" })
  })
  .then(() => Promise.map(matchsSeed, m => insertMatchs(m)))
  .then(() => {
    // example data
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
        teamHome: "Espagne",
        teamOut: "Belgique",
        scoreTeamHome: 3,
        scoreTeamOut: 2,
        hours: "15h40",
        localisation: "Moscow"
      },
      {
        teamHome: "Espagne",
        teamOut: "Belgique",
        scoreTeamHome: 3,
        scoreTeamOut: 2,
        hours: "14h40",
        localisation: "St P."
      }
    ]
    for (match of matchs) {
      insertMatchs(match)
    }
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

//LA ROUTE /matchs
//CREATE
app.post("/matchs", (req, res) => {
  return insertMatchs(req.body)
    .then(record => res.json(record))
})

//READ
app.get("/matchs", (req, res) => {
  db.all("SELECT * from matchs")
    .then(records => {
      console.log(records)
      return res.json(records)
    })
})


//LA ROUTE /wilders
//CREATE
app.post("/wilders", (req, res) => {
  return insertWilders(req.body)
    .then(record => res.json(record))
})

//READ
app.get("/wilders", (req, res) => {
  db.all("SELECT * from wilders")
    .then(records => {
      console.log(records)
      return res.json(records)
    })
})

//route par défaut qui renvoie le code html/css/js complet de l'application
app.get("*", (req, res) => {
  // to test log du path
  res.send(html)
  res.end()
})

app.listen(8000)
