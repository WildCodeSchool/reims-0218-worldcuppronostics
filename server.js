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
  const { teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation, groupe, drapeauHome, drapeauOut} = m
  return db.get("INSERT INTO matchs(teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation, groupe, drapeauHome, drapeauOut) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)", teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation, groupe, drapeauHome, drapeauOut)
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
//inserer un pronostic
const insertProno = p => {
  const { wilderId, matchId, pronoTeamHome,  pronoTeamOut } = p
    return db.get("INSERT INTO pronostics(wilderId, matchId, pronoTeamHome, pronoTeamOut) VALUES(?, ?, ?, ?)", wilderId, matchId, pronoTeamHome, pronoTeamOut)
      .then(() => db.get("SELECT last_insert_rowid() as id"))
      .then(({ id }) => db.get("SELECT * from pronostics WHERE id = ?", id))
  }
//code qui remplit la db exemple
const dbPromise = Promise.resolve()
  .then(() => sqlite.open("./database.sqlite", { Promise }))
  .then(_db => {
    db = _db
    return db.migrate({ force: "last" })
  })
  .then(() => {
    insertWilders({
      nom: 'Dumay',
      prenom: 'Pierre',
      pseudo: 'radiobierefoot',
      mail: 'pierre@wild.fr',
      motdepasse: '1234',
      city: 'Reims',
      equipepreferee: 'Monaco'
    })
    insertWilders({
      nom: 'Deschamps',
      prenom: 'Arnaud',
      pseudo: 'de',
      mail: 'arnaud@wild.fr',
      motdepasse: '1234',
      city: 'Reims',
      equipepreferee: 'Reims'
    })
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
      matchs = [...matchs, ...groupMatchs]
    }
    const teams = matchsSeed.teams
    const stadiums = matchsSeed.stadiums
    const matchsToInsert = matchs.map(match => {
      const teamHome = teams.find(team => team.id === match.teamHome)
      const teamOut = teams.find(team => team.id === match.teamOut)
      //console.log('match before transorm', match);
      return {
        teamHome: teamHome.name,
        teamOut: teamOut.name,
        hours: match.date,
        localisation: stadiums.find(stadium => stadium.id === match.stadium).city,
        groupe: match.group,
        drapeauHome: teamHome.flag,
        drapeauOut: teamOut.flag
      }
    })
      Promise.map(matchsToInsert, m => insertMatchs(m))
  })
  .then(() => {
    insertProno({
      wilderId: 1,
      matchId: 10,
      pronoTeamHome: 4,
      pronoTeamOut: 0
    })
    insertProno({
      wilderId: 1,
      matchId: 24,
      pronoTeamHome: 1,
      pronoTeamOut: 2
    })
    insertProno({
      wilderId: 2,
      matchId: 10,
      pronoTeamHome: 2,
      pronoTeamOut: 6
    })
    insertProno({
      wilderId: 2,
      matchId: 3,
      pronoTeamHome: 2,
      pronoTeamOut: 6
    })
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
      <div id="main" class="container">
      </div>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      <script src="/page.js"></script>
      <script type="module" src="/app.js"></script>
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
    .then(records => records)
    .then(matchs => {
      db.all(`SELECT * from matchs
        join pronostics on pronostics.matchId = matchs.id
        join wilders on pronostics.wilderId = wilders.id
        where wilders.id = 1 OR wilders.id IS NULL`)
        .then(pronos => {
          //console.log(pronos)
          const matchWithProno = matchs.map(
            match => {
              //chercher dans pronos le match
              const matchProno = pronos.find(prono => prono.matchId === match.id)
              return matchProno ? matchProno : match
            }
          )
          return res.json(matchWithProno)
        })
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

app.listen(8000, () => {
  console.log("App lancée : ")
})
