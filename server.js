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
  .then(() => {
    //console.log(matchsSeed) // l'objet global du json
    //console.log(matchsSeed.groups)
    let matchs = [] // on définit un tableau vide
    for (let group in matchsSeed.groups) { // une boucle qui cherche les groupes
      //console.log(matchsSeed.groups[group].matches)
      matchs = [...matchs, ...matchsSeed.groups[group].matches]
    }
    //console.log("res: ", matchs)
    const teams = matchsSeed.teams
    //console.log(teams) // toutes les teams avec id, name et iso2
    const stadiums = matchsSeed.stadiums
    //console.log(stadiums) // tous les stades avec les city, les names etc
    const matchsToInsert = matchs.map(match => {
      //console.log(match)
      //console.log(teams.find(team => team.id === match.teamHome))
      const teamHome = teams.find(team => team.id === match.teamHome) // renvoie le premier élement de la condition, donc
      const teamOut = teams.find(team => team.id === match.teamOut)

      //console.log(teamHome, teamOut)
      //console.log(teams[match.teamHome].name)
      return {
        teamHome: teamHome.name,
        teamOut: teamOut.name,
        hours: match.date,
        localisation: stadiums.find(stadium => stadium.id === match.stadium).city
      }
    })
    //console.log(matchsToInsert)
      Promise.map(matchsToInsert, m => insertMatchs(m))
  })

const html = `
  <!doctype html>
  <html class="no-js" lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>Pronostics Wooorld Cup</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <link rel="stylesheet" href="/styles.css">
      </head>
    <body>
      <div id="main">
      </div>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
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
