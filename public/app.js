import makeMatchsList from "./matchs.js"
import makeHiddenButton, { makeDisplayMatch }  from "./matchs.js"
import {navBarLogin, navBarNoLogin} from "./navbar.js"
import makeCard from "./make-card.js"
import makeProfil from "./make-profil.js"
import serializeForm from "./serializeForm.js"

const mainDiv = document.getElementById("main")

const render = html => {
  mainDiv.innerHTML = html
}


const token = localStorage.getItem("token")

const loginWilderHtml = `
<form id="login-wilder">
  <div class="form-group">
    <label for="inputMail">Email</label>
    <input name="email" type="text" class="form-control" id="inputMail" placeholder="Entrez votre email" required>
  </div>
  <div class="form-group">
    <label for="inputPassword">Mot de passe</label>
    <input name="password" type="password" class="form-control" id="inputPassword" placeholder="Entrez votre mot de passe" required>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`

  //routing côté client
  const controllers = {
    "/": () => {
      render(
        `${navBarNoLogin}`
      )
      const buttonLogin = document.getElementById("button-login") // se trouve dans navbar.js
      buttonLogin.addEventListener("click", () => {
        document.getElementById("modal-login").innerHTML = `
            ${!token ? loginWilderHtml : ""}
        <div id="alert-login" class="hidden"></div>
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
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const alert = document.getElementById("alert-login")
          if(!data.user) {
            //alet class danger
            alert.innerHTML = `échec du login`
          } else {
            alert.innerHTML = `Vous êtes bien identifié`
            //stores the token
            localStorage.setItem("token", data.token)
            // document.getElementById("link-signin").style.display = "none"
            // document.getElementById("login-wilder").style.display = "none"
            // buttonLogin.style.display = "none"
          }
          const callTest = document.getElementById("test")
          callTest.addEventListener("click", () => {
            const token = localStorage.getItem("token")
            console.log(token);
            fetch("test", {
                method: "GET",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                }
            })
            .then(res => res.json())
            .catch(err => console.log(err))
          })
        })
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
            ${navBarNoLogin}
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

          console.log(token)
          const buttons = document.getElementsByClassName("button-bet")
            for (let button of buttons) {
            button.addEventListener("click", () => {
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
                    <button type="submit" class="btn btn-outline-success prono"> Valider </button>
                </form>
              </div>
            </div>
              `
              fetch("/pronostics", {
                method: "GET",
                headers: {
                  "Accept": "application/json, text/plain, */*",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token, // send token
                },
                body: JSON.stringify(data)
              })
              console.log(button.dataset);
              const form = document.getElementById("form-prono")
              form.addEventListener("submit", e => {
                e.preventDefault() //à tester sans et avec
                const data = serializeForm(form)  //la fonction récupère tous les champs d'un form et les récupère pr en faire objet js
                console.log(data)
                const token = localStorage.getItem("token") // get token
                fetch("/pronostics", {
                  method: "POST",
                  headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token, // send token
                  },
                  body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(pronostic => {
                  const alertBox = document.getElementById("alert-box")
                  alertBox.className = "alert alert-success"
                  alertBox.innerHTML = `Votre prono est bien enregistré`
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
              setTimeout(() => {location.href="/domyprono"}, 3000) // direction la page /domyprono quand il est inscrit
            })
      })
    },
    // TEST DE ARNAUD DESCHAMPS
    "/list-matchs": () =>
      render(makeHiddenButton(matches[0])),

    "/mon-profil": () =>
      //la route matchs
      fetch("/wilders")
      .then(res => res.json())
      .then(wilders => wilders.reduce((carry, wilder) => carry + makeProfil(wilder), ""))
      .then(album => render(
          `
            ${navBarNoLogin}
            <div class="row">${album}</div>
          </div>`)
      )

  ,

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
