import makeMatchsList from "./matchs.js"
import makeHiddenButton, { makeDisplayMatch }  from "./matchs.js"
import {navBarLogin, navBarNoLogin} from "./navbar.js"

const mainDiv = document.getElementById("main")

const render = html => {
  mainDiv.innerHTML = html
}

//renvoie le html d'une card bootstrap pour un match

  const makeCard = item =>
      `
      <div class="card mx-auto mb-3" style="width: 18rem;">
        <div class="card-body text-center">
          <p> ${item.teamHome} </p>
          <img src="${item.drapeauHome}" style="width: 48px; height: 48px" class="rounded">
          <img src="${item.drapeauOut}" style="width: 48px; height: 48px" class="rounded">
          <p> ${item.teamOut} </p>
          <p class="idmatch"> ${item.id} </p>
          <p> ${item.localisation} </p>
          <p> ${item.numberMatch} </p>
        </div>
        <!-- Large modal -->
        <div class="text-center">
          <button type="button" data-index="${item.id}" data-teamHome="${item.teamHome}" data-teamOut="${item.teamOut}" data-drapeauHome="${item.drapeauHome}" data-drapeauOut="${item.drapeauOut}" data-localisation="${item.localisation}" data-numbermatch="${item.numberMatch}" class="btn btn-primary button-bet" data-toggle="modal" data-target=".bd-example-modal-lg">Pariez !</button>
        </div>
      </div>
      `
//renvoie le html d'une card bootstrap pour un wilder
const makeProfil = profil =>
  `
<div class="container" style="padding-top: 60px;">

  <div class="row">
      <!-- left column -->
      <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="text-center">
              <img src="https://media.licdn.com/dms/image/C4D03AQE1f8XY5CkayQ/profile-displayphoto-shrink_800_800/0?e=1528707600&v=beta&t=5rLhsfXCegNLMpxjWWXyGfrkBHLHZCI9tIa9gYfbd5g"
                  class="avatar img-circle img-thumbnail" alt="avatar">
              <p>Changer d'avatar ci-dessous</p>
              <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile">
                  <label class="custom-file-label" for="customFile">Choisis ton avatar</label>
              </div>
          </div>
      </div>
      <!-- edit form column -->
      <div class="col-md-8 col-sm-6 col-xs-12 personal-info">
          <div class="alert alert-info alert-dismissable">
              <a class="panel-close close" data-dismiss="alert">×</a>
              <i class="fa fa-coffee"></i>
              Tu as modifier ton
              <strong>profil</strong> avec succès!
          </div>
          <h3>Mes informations:</h3>
          <form class="form-horizontal" role="form">
              <div class="form-group">
                  <label class="col-lg-3 control-label">Prénom:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.prenom}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-lg-3 control-label">Nom:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.nom}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-lg-3 control-label">Pseudo:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.pseudo}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-lg-3 control-label">Email:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.mail}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-lg-3 control-label">Ville:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.city}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-md-3 control-label">Ton équipe favorite:</label>
                  <div class="col-md-8">
                      <input class="form-control" value="${profil.equipepreferee}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-md-3 control-label">Mot de passe:</label>
                  <div class="col-md-8">
                      <input type="password" class="form-control" value="11111122333" name="passport">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-md-3 control-label">Confirmation du mot de passe:</label>
                  <div class="col-md-8">
                      <input type="password" class="form-control" value="11111122333" name="passport">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-md-3 control-label"></label>
                  <div class="col-md-8">
                      <input class="btn btn-outline-success" value="Valider" type="button">
                      <input class="btn btn-outline-danger" value="Annuler" type="button">
                  </div>
              </div>
          </form>
      </div>
  </div>
</div>
</div>

  `

//récuperer tous les champs d'un formulaire pour en faire un object js
const serializeForm = form => {
  const data = {}
  const elements = form.getElementsByClassName("form-control")
  for (let el of elements) {
    data[el.name] = el.value
  }
  return data
}

const matches = [
{
  "name": 20,
  "type": "group",
  "teamHome": "France",
  "teamOut": "Espagne",
  "scoreTeamHome": 0,
  "scoreTeamOut": 3,
  "date": "2018-06-20T21:00:00+03:00",
  "stadium": 5,
  "channels": [],
  "finished": false,
  "localisation": "Moscow",
  "drapeauHome": "http://flags.fmcdn.net/data/flags/w580/ru.png",
  "drapeauOut": "http://flags.fmcdn.net/data/flags/w580/ru.png"

},
{
  "name": 35,
  "type": "group",
  "teamHome": "Irlande",
  "teamOut": "Colombie",
  "scoreTeamHome": null,
  "scoreTeamOut": null,
  "date": "2018-06-25T21:00:00+03:00",
  "stadium": 9,
  "channels": [],
  "finished": false
},
{
  "name": 36,
  "type": "group",
  "teamHome": "Allemagne",
  "teamOut": "Pays-Bas",
  "scoreTeamHome": null,
  "scoreTeamOut": null,
  "date": "2018-06-25T20:00:00+02:00",
  "stadium": 4,
  "channels": [],
  "finished": false
}
]

  //routing côté client
  const controllers = {
    "/": () => {
      render(
        `${navBarNoLogin}`
      )
      const buttonLogin = document.getElementById("button-login") // se trouve dans navbar.js
      buttonLogin.addEventListener("click", () => {
        document.getElementById("modal-login").innerHTML = `
        </div>
        <form id="login-wilder">
          <div class="form-group">
            <label for="inputMail">Email</label>
            <input name="username" type="text" class="form-control" id="inputMail" placeholder="Entrez votre email" required>
          </div>
          <div class="form-group">
            <label for="inputPassword">Mot de passe</label>
            <input name="password" type="password" class="form-control" id="inputPassword" placeholder="Entrez votre mot de passe" required>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div id="alert-login" class="hidden">
        <div id="test">CALL TEST</div> 
        `
      })
      const loginWilder = document.getElementById("modal-login")
      loginWilder.addEventListener("submit", e => {
        e.preventDefault()
        // data ?
        const data = serializeForm(loginWilder)  //la fonction récupère tous les champs d'un form et les récupère pr en faire objet js
        console.log(data)
        // post sur le serveur /auth/login
        fetch("/auth/login", {
          method: "POST",
          headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json() )
        .then(data => {
          const alert = document.getElementById("alert-login")
          if(!data.user) {
            //alet class danger
            alert.innerHTML = `échec du login`
          } else {
            alert.innerHTML = `Vous êtes bien identifié`
            //stores the token
            localStorage.setItem("token", data.token)
            loginWilder.style.display = 'none'
          }
        })
      })
    

    document.getElementById("test").addEventListener( "click", () => {
      fetch("test")
      .then(res => res.json())
      .catch(err => console.log(err))
    })
  }
  ,
    "/domyprono": () => {

      //la route matchs
      fetch("/matchs")
      .then(res => res.json())
      .then(matchs => matchs.reduce((carry, match) => carry + makeCard(match), ""))
      .then(album => {
        render(
          `
            ${navBarLogin}
          <div class="jumbotron jumbotron-fluid bg-jumbotron">
          <div class="container">
            <h1 class="display-3">Mes pronos</h1>
          </div>
        </div>
        <div class="container">
            <div class="row">${album}</div>
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content" id="modal-prono">
                </div>
              </div>
            </div>
          </div>`)

          const buttons = document.getElementsByClassName("button-bet")
            for (let button of buttons) {
            button.addEventListener("click", () => {
              // console.log(button.dataset)
              // const nameTeamHome = document.getElementById("nameTeamHomeModal")
              // const nameTeamOut = document.getElementById("nameTeamOutModal")
              // const flagTeamHome = document.getElementById("flagTeamHome")
              // const flagTeamOut = document.getElementById("flagTeamOut")
              // nameTeamOut.innerHTML = `${button.dataset.teamout}`
              // nameTeamHome.innerHTML = `${button.dataset.teamhome}`
              // flagTeamHome.src = `${button.dataset.drapeauhome}`
              // flagTeamOut.src = `${button.dataset.drapeauout}`
              // console.log(nameTeamHome)
              document.getElementById("modal-prono").innerHTML = `
              <div id="alert-box" class="hidden">
              </div>
              <div id="match-details-curtain">
                <div id="match-details-container">
                  <div id="alert-box" class="hidden">
                  </div>
                  <div id="title">TON PRONO</div>
                  <div id="teams-container">
                    <div class="homecomming-team flexbox-items">
                    <img src="${button.dataset.drapeauhome}" id="flagTeamHome" style="width: 48px; height: 48px" class="rounded">
                        <br />
                        <p id="nameTeamHomeModal">${button.dataset.teamhome}</p>
                    </div>
                    <div class="flexbox-items">
                        <div id="time-of-match"></div>
                        <p id="date"></p>
                        <br />
                        <div id="vs"><div class="circle"></div><hr id="vs-line"/><div class="circle"></div></div>
                    </div>
                    <div class="away-team flexbox-items">
                    <img src="${button.dataset.drapeauout}" id="flagTeamOut" style="width: 48px; height: 48px" class="rounded">
                        <br />
                        <p id="nameTeamOutModal">${button.dataset.teamout}</p>
                    </div>
                </div>
                <form id="form-prono">
                    <input type="number" id="inputPronoTeamHome" name="pronoTeamHome" value="0" min="0" max="15" class="homecomming-team score form-control"></input>
                    <input type="number" id="inputPronoTeamOut" name="pronoTeamOut" value="0" min="0" max="15" class="away-team score form-control"></input>
                    <input type="hidden" id="numberMatch" name="matchId" class="form-control" value="${button.dataset.numbermatch}">
                    <input type="hidden" id="wilderId" name="wilderId" class="form-control" value="1">
                    <button type="submit" class="btn btn-outline-success prono"> Valider </button>
                </form>
              </div>
            </div>
              `
              console.log(button.dataset);
              const form = document.getElementById("form-prono")
              form.addEventListener("submit", e => {
                e.preventDefault() //à tester sans et avec
                const data = serializeForm(form)  //la fonction récupère tous les champs d'un form et les récupère pr en faire objet js
                console.log(data)
                fetch("/pronostics", {
                  method: "POST",
                  headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(pronostic => {
                  const alertBox = document.getElementById("alert-box")
                  alertBox.className = "alert alert-success"
                  alertBox.innerHTML = `Votre prono est bien enregistré`
                })
                .then(button => {
                  console.log("Je suis ici")
                  //const buttonModify = document.getElementsByClassName("button-bet")[0].style.color="red"

                })
              })
            })

          }

        })
      },

    "/wilders/new": () => {
      //construit le formulaire
      render(
        `<div class="container">
      <div id="alert-box" class="hidden">
      </div>
      <form id="add-wilder">
        <div class="form-group">
          <label for="inputName">Nom</label>
          <input name="nom" type="text" class="form-control" id="inputName" placeholder="Entrez votre nom" required>
        </div>
        <div class="form-group">
          <label for="inputPrenom">Prénom</label>
          <input name="prenom" type="text" class="form-control" id="inputPrenom" placeholder="Entrez votre prénom" required>
        </div>
        <div class="form-group">
          <label for="inputPseudo">Pseudo</label>
          <input name="pseudo" type="text" class="form-control" id="inputPseudo" placeholder="Entrez votre pseudo" required>
        </div>
        <div class="form-group">
          <label for="inputMail">E-mail</label>
          <input name="mail" type="e-mail" class="form-control" id="inputMail" placeholder="Entrez votre e-mail" required>
        </div>
        <div class="form-group">
          <label for="inputMotDePasse">Mot de passe</label>
          <input name="motdepasse" type="password" class="form-control" id="inputMotDePasse" placeholder="Choississez votre mot de passe" required>
        </div>
        <div class="form-group">
          <label for="inputConfirmationMotDePasse">Confirmation de mot de passe</label>
          <input name="confirmationmotdepasse" type="password" class="form-control" id="inputConfirmationMotDePasse" placeholder="Veuillez confirmer votre mot de passe" required>
        </div>
        <div class="form-group">
          <label for="inputCity">Votre ville</label>
          <input name="city" type="text" class="form-control" id="inputCity" placeholder="Entrez votre ville actuelle" required>
        </div>
        <div class="form-group">
          <label for="inputEquipePreferee">Votre équipe supportée pour le Mondial</label>
          <input name="equipepreferee" type="text" class="form-control" id="inputEquipePreferee" placeholder="Entrez votre équipe supportée" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>`
      )
      //transformer l'objet js en json sur ma route wilder/new
      const form = document.getElementById("add-wilder")
      form.addEventListener("submit", e => {
        e.preventDefault() //à tester sans et avec
        const data = serializeForm(form)  //la fonction récupère tous les champs d'un form et les récupère pr en faire objet js
        fetch("/wilders", {
          method: "POST",
          headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(wilder => {
              const alertBox = document.getElementById("alert-box")
              alertBox.className = "alert alert-success"
              alertBox.innerHTML = `Successfully created wilder ${wilder.nom} ${wilder.prenom}`
            })
      })
    },
    "/list-matchs": () =>
      render(makeHiddenButton(matches[0])),

    "/mon-profil": () =>
      //la route matchs
      fetch("/wilders")
      .then(res => res.json())
      .then(wilders => wilders.reduce((carry, wilder) => carry + makeProfil(wilder), ""))
      .then(album => render(
          `
            ${navBarLogin}
            <div class="row">${album}</div>
          </div>`)
      )
    ,
    // "/addScoreReal": () =>
    // fetch("/matchs")
    //   .then(res => res.json())
    //   .then(matchs => {
    //     for (let i = 0; i < matchs.length; i ++) {
    //       console.log(matchs[i].numberMatch)
    //     }
    //   .then(scoreReal => {
    //     const listhtml = scoreReal.numberMatch.reduce(
    //       (acc, scoreRealNumberMatch) => acc + `<li> ${scoreRealNumberMatch} </li>`
    //     )
    //   })
    // })

    "*": () => render("<h1>Not Found</h1>")
    // toutes les autres routes sauf / on obtient en get NOT FOUND
  }
  //gère l'éxécution du routing côté client
  const routing = () => {
    const routes = [ //ne pas mettre les routes du côté serveur (fetch)
      "/",
      "/domyprono",
      "/wilders/new",
      "/mon-profil",
      "/list-matchs",
      "*"
    ]
    routes.forEach(
      path => page(path, controllers[path])
    )
    page()
  }

  //appel cette fonction pour gérer les routes
  routing()
