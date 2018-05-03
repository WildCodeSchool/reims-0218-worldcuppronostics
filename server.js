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
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="css/mdb.min.css" rel="stylesheet">
  <!-- custom style -->
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div id="navBar">
  </div>
  <div id="main">
  </div>
  <footer class="container-fluid text-center pt-5">
    <div class="footer-above">
      <h2 class="pb-3"> World Cup Pronostics</h6>
      <a href="/" id="icone-ballon" class="mx-auto mb-3"></a>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h3 class="footer-title-h3">Les projets WildCodeSchool</h3>
            <ul class="list-project-wild">
              <li><a href="#">ArteZic</a></li>
              <li><a href="#">WildBook</a></li>
              <li><a href="#">MarioKart</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h3 class="footer-title-h3">Réseaux Sociaux</h3>
            <ul class="list-inline mt-3">
              <a href="#"><img src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/online_social_media_facebook-128.png" alt="facebook" class="social-footer"></a>
              <a href="#"><img src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/twitter_online_social_media-256.png" alt="twitter" class="social-footer"></a>
              <a href="#"><img src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/instagram_online_social_media_photo-256.png" alt="instagram" class="social-footer"></a>
              <a href="#"><img src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/linked_in_online_social_media-256.png" alt="linkedin" class="social-footer"></a>
            </ul>
          </div>
          <div class="col-md-4">
          <h3 class="footer-title-h3" >Les liens utiles</h3>
            <ul class="list-project-wild">
              <li><a href="/"> Ton compte </a></li>
              <li><a href="/"> Nos règles </a></li>
              <li><a href="/"> Le classement général </a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-below">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            Copyright &copy; WildCodeSchool-REIMS
          </div>
        </div>
      </div>
    </div>
  </footer>
    <!-- SCRIPTS -->
      <!-- JQuery -->
      <script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
      <!-- Bootstrap tooltips -->
      <script type="text/javascript" src="js/popper.min.js"></script>
      <!-- Bootstrap core JavaScript -->
      <script type="text/javascript" src="js/bootstrap.min.js"></script>
      <!-- MDB core JavaScript -->
      <script type="text/javascript" src="js/mdb.min.js"></script>
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

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


//LA ROUTE /matchs
//CREATE
app.post("/matchs", (req, res) => {
  return insertMatchs(req.body)
    .then(record => res.json(record))
})

//READ
app.get("/matchs", passport.authenticate('jwt', { session: false }), (req, res) => {
  db.all("SELECT * from matchs")
    .then(records => records)
    .then(matchs => {
      db.all(`SELECT * from matchs
        join pronostics on pronostics.matchId = matchs.id
        join wilders on pronostics.wilderId = wilders.id
        where wilders.id = ${req.user.id} OR wilders.id IS NULL`)
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
  return insertProno(prono)
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
