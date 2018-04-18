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
  const { teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation, groupe} = m
  return db.get("INSERT INTO matchs(teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation, groupe) VALUES(?, ?, ?, ?, ?, ?, ?)", teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation, groupe)
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
  .then(() => {
    let matchs = []
    for (let group in matchsSeed.groups) {
      const groupMatchs = matchsSeed.groups[group].matches.map(
        match => ({
          ...match,
          group
        })
      )
      // console.log(groupMatchs)
      matchs = [...matchs, ...groupMatchs]
    }
    console.log(matchs)
    const teams = matchsSeed.teams
    const stadiums = matchsSeed.stadiums
    const matchsToInsert = matchs.map(match => {
      console.log('match', match)
      const teamHome = teams.find(team => team.id === match.teamHome)
      const teamOut = teams.find(team => team.id === match.teamOut)
      //console.log('match before transorm', match);
      console.log('home: ', teamHome)
      console.log('out: ', teamOut)
      return {
        teamHome: teamHome.name,
        teamOut: teamOut.name,
        hours: match.date,
        localisation: stadiums.find(stadium => stadium.id === match.stadium).city,
        groupe: match.group
      }
    })
      Promise.map(matchsToInsert, m => insertMatchs(m))
  })

const html = `
  <!doctype html>
  <html class="no-js" lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>Pronostics Woorld Cup</title>
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
      //console.log(records)
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
      //console.log(records)
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
