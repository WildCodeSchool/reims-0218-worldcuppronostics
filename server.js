//chargement des modules
const sqlite = require("sqlite")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const Promise = require("bluebird")
const passport = require('passport')
//chargement des fichiers dans public
const matchsSeed = require("./public/matchs.json")
// database
let db

require('./passport-strategy')
const auth = require('./auth')

//permet de servir les ressources statiques du dossier public
app.use(express.static("public"))
app.use(bodyParser.json())
app.use('/auth', auth)

//inserer un match
const insertMatchs = m => {
  const { teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation, groupe, drapeauHome, drapeauOut, numberMatch } = m
  return db.get("INSERT INTO matchs(teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation, groupe, drapeauHome, drapeauOut, numberMatch) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", teamHome, teamOut, scoreTeamHome, scoreTeamOut, hours, localisation, groupe, drapeauHome, drapeauOut, numberMatch)
    .then(() => db.get("SELECT last_insert_rowid() as id")) //on récupère le dernier enregistrement
    .then(({ id }) => db.get("SELECT * from matchs WHERE id = ?", id))
}

// //inserer un score réel
// const insertMatchReal = r => {
//   const { teamHome, teamOut, scoreTeamHome, scoreTeamOut } = r
//   return db.get("UPDATE INTO matchs(teamHome, teamOut, scoreTeamHome, scoreTeamOut ) VALUES(?, ?, ?, ?)", teamHome, teamOut, scoreTeamHome, scoreTeamOut)
//     .then(() => db.get("SELECT last_insert_rowid() as id")) //on récupère le dernier enregistrement
//     .then(({ id }) => db.get("SELECT * from matchs WHERE id = ?", id))
// }

//inserer un wilder
const insertWilders = w => {
  const { nom, prenom, pseudo, mail, motdepasse, city, equipepreferee } = w
  return db.get("INSERT INTO wilders(nom, prenom, pseudo, mail, motdepasse, city, equipepreferee) VALUES(?, ?, ?, ?, ?, ?, ?)", nom, prenom, pseudo, mail, motdepasse, city, equipepreferee)
    .then(() => db.get("SELECT last_insert_rowid() as id"))
    .then(({ id }) => db.get("SELECT * from wilders WHERE id = ?", id))
}
//inserer un pronostic
const insertProno = p => {
  const { wilderId, matchId, pronoTeamHome, pronoTeamOut } = p
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
        drapeauOut: teamOut.flag,
        numberMatch: match.name
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
  <title>Pronostics World Cup</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
    crossorigin="anonymous">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div id="navBar">
  </div>
  <div id="main">
  </div>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
    crossorigin="anonymous"></script>
  <script src="/page.js"></script>
  <script type="module" src="/app.js"></script>
</body>
</html>
`

//routing côté serveur

//LA ROUTE /test
app.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`authorized for user ${req.user.email} with id ${req.user.id}`)
})

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

//UPDATE
app.put("/matchs", (req, res) => {
  console.log("app.put marche")
})

//A delete apres authentification

//CREATE
app.post("/pronostics", passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log("req.user", req.user);
  console.log("id user", req.user.id);
  const prono = {
    wilderId: req.user.id, // En attendant l'authentification // REMPLACER PAR UN POUR PARIER POUR LE MOMENT :)
    ...req.body
  }

  console.log("req.body", req.body);
  console.log("prono: ", prono)
  // if req.user.admin update match
  //else
  return insertProno(req.body)
    .then(record => res.json(record))
})

// READ
app.get("/pronostics", (req, res) => {
  db.all("SELECT * FROM pronostics")
    .then(records => {
      return res.json(records)
    })
})

// //LA ROUTE /test
// app.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.send(`authorized for user ${req.user.email} with id ${req.user.id}`)
// })

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
