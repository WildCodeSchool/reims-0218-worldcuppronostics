import makeMatchsList from "./matchs.js"
import makeDisplayMatch from "./matchs.js"

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
          <img src="${item.drapeauHome}" style="width: 48px; height: 48px; class="rounded">
          <img src="${item.drapeauOut}" style="width: 48px; height: 48px;" class="rounded">
          <p> ${item.teamOut}
            <p class="idmatch"> ${item.id} </p>
        </div>
        <!-- Large modal -->
        <div class="text-center">
          <button type="button" data-index="${item.id}" class="btn btn-primary button-bet" data-toggle="modal" data-target=".bd-example-modal-lg">Pariez !</button>
        </div>
      </div>
      `

//renvoie le html d'une card bootstrap pour un wilder
const makeProfil = profil =>
  `<div class="col-8 mx-auto text-center">
    <div class="card mb-4 box-shadow">
      <div class="card-body">
        <p class="card-text" style="height: 30px">Nom : ${profil.nom}</p>
        <p class="card-text" style="height: 30px">Prénom : ${profil.prenom}</p>
        <p class="card-text" style="height: 30px">Nom du profil :${profil.pseudo}</p>
        <p class="card-text" style="height: 30px">Mail : ${profil.mail}</p>
        <p class="card-text" style="height: 30px">Ville: ${profil.city}</p>
        <p class="card-text" style="height: 30px">Tu supportes ${profil.equipepreferee}</p>
      </div>
    </div>
  </div>`

//récuperer tous les champs d'un formulaire pour en faire un object js
const serializeForm = form => {
  const data = {}
  const elements = form.getElementsByClassName("form-control")
  for (el of elements) {
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
  "scoreTeamHome": null,
  "scoreTeamOut": null,
  "date": "2018-06-20T21:00:00+03:00",
  "stadium": 5,
  "channels": [],
  "finished": false
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

      //la route matchs
      fetch("/matchs")
      .then(res => res.json())
      .then(matchs => matchs.reduce((carry, match) => carry + makeCard(match), ""))
      .then(album => {
        render(
          `<div class="container p-0">
            <div class="jumbotron">
              <h1 class="display-3">Hello, world!</h1>
              <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
              <p><a class="btn btn-primary btn-lg" href="/about" role="button">Learn more »</a></p>
              <p><a class="btn btn-success btn-lg" href="/wilders/new" role="button">S'inscrire »</a></p>
              <p><a class="btn btn-success btn-lg" href="/mon-profil" role="button">Mon profil »</a></p>
            </div>
            <div>
            </div>
            <div class="row">${album}</div>
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="container">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id=""></span>
                      </div>
                      <input type="number" id="scoreTeamOne" name="equipeOne" value="0" min="0" max="15" class="form-control">
                      <input type="number" id="scoreTeamTwo" name="equipeTwo" value="0" min="0" max="15" class="form-control">
                      <span class="input-group-text"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div> `)
            const buttons = document.getElementsByClassName("button-bet")
            for (let i = 0; i < buttons.length; i ++) {
            buttons[i].addEventListener("click", () => {
              console.log(buttons[i].dataset.index)
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
          <input name="motdepasse" type="text" class="form-control" id="inputMotDePasse" placeholder="Choississez votre mot de passe" required>
        </div>
        <div class="form-group">
          <label for="inputConfirmationMotDePasse">Confirmation de mot de passe</label>
          <input name="confirmationmotdepasse" type="text" class="form-control" id="inputConfirmationMotDePasse" placeholder="Veuillez confirmer votre mot de passe" required>
        </div>
        <div class="form-group">
          <label for="inputCity">Votre ville</label>
          <input name="city" type="text" class="form-control" id="inputCity" placeholder="Entrez votre ville actuelle" required>
        </div>
        <div class="form-group">
          <label for="inputEquipePreferee">Votre équipe supportée pour le Mondial</label>
          <input name="equipepreferee" type="text" class="form-control" id="inputEquioePreferee" placeholder="Entrez votre équipe supportée" required>
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
      render(makeDisplayMatch(matches)),

    "/mon-profil": () =>
      //la route matchs
      fetch("/wilders")
      .then(res => res.json())
      .then(wilders => wilders.reduce((carry, wilder) => carry + makeProfil(wilder), ""))
      .then(album => render(
          `<div class="container">
            <div class="jumbotron">
              <h1 class="display-3">PAGE MON PROFIL</h1>
              <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
              <p><a class="btn btn-primary btn-lg" href="/about" role="button">Learn more »</a></p>
              <p><a class="btn btn-success btn-lg" href="/" role="button">Retour à l'accueil »</a></p>
              <p><a class="btn btn-success btn-lg" href="/wilders/new" role="button">S'inscrire »</a></p>
              <p><a class="btn btn-success btn-lg" href="/mon-profil" role="button">Mon profil »</a></p>
            </div>
            <div class="row">${album}</div>
          </div>`)
      )
    ,

    "/mes-pronos": () =>
    fetch("/matchs")
    ,


    "*": () => render("<h1>Not Found</h1>")
    // toutes les autres routes sauf / on obtient en get NOT FOUND
  }

  //gère l'éxécution du routing côté client
  const routing = () => {
    const routes = [ //ne pas mettre les routes du côté serveur (fetch)
      "/",
      "/wilders/new",
      "/mon-profil",
      "/mes-pronos",
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
