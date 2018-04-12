const mainDiv = document.getElementById("main")

const render = html => {
  mainDiv.innerHTML = html
}

//renvoie le html d'une card bootstrap pour un match
const makeCard = item =>
  `<div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${item.image}" alt="Match" />
      <div class="card-body">
        <p class="card-text" style="height: 80px">${item.teamHome}-${item.teamOut}</p>
        <p class="card-text" style="height: 80px">${item.scoreTeamHome}-${item.scoreTeamOut}</p>
      </div>
    </div>
  </div>`

//renvoie le html d'une card bootstrap pour un wilder
const makeProfil = item2 =>
`<div class="col-md-4">
<div class="card mb-4 box-shadow">
  <img class="card-img-top" src="${item2.image}" alt="Match" />
  <div class="card-body">
    <p class="card-text" style="height: 80px">${item2.nom}-${item2.prenom}</p>
    <p class="card-text" style="height: 80px">${item2.pseudo}-${item2.mail}</p>
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

  //routing côté
  const controllers = {
    "/": () =>

      //la route matchs
      fetch("/matchs")
        .then(res => res.json())
        .then(matchs => matchs.reduce((carry, match) => carry + makeCard(match), ""))
        .then(album => render(
          `<div class="container">
      <div class="jumbotron">
        <h1 class="display-3">Hello, world!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        <p><a class="btn btn-primary btn-lg" href="/about" role="button">Learn more »</a></p>
        <p><a class="btn btn-success btn-lg" href="/matchs/new" role="button">Add a match »</a></p>
        <p><a class="btn btn-success btn-lg" href="/wilders/new" role="button">S'inscrire »</a></p>
        <p><a class="btn btn-success btn-lg" href="/mon-profil" role="button">Mon profil »</a></p>
        </div>
      <div class="row">${album}</div>
    </div>`)
        )
    ,
    "/matchs/new": () => {
      //construit le formulaire
      render(
        `<div class="container">
      <div id="alert-box" class="hidden">
      </div>
      <form id="add-match">
        <div class="form-group">
          <label for="inputTeamHome">Equipe Domicile</label>
          <input name="teamHome" type="text" class="form-control" id="inputTeamHome" placeholder="Entrer teamhome">
        </div>
        <div class="form-group">
          <label for="inputTeamOut">Equipe Extérieur</label>
          <input name="teamOut" type="text" class="form-control" id="inputTeamOut" placeholder="Entrer teamout">
        </div>
        <div class="form-group">
          <label for="inputScoreTeamHome">Score Domicile</label>
          <input name="scoreTeamHome" type="text" class="form-control" id="inputScoreTeamHome" placeholder="Entrer the score domicile">
        </div>
        <div class="form-group">
          <label for="inputScoreTeamOut">Score extérieur</label>
          <input name="scoreTeamOut" type="text" class="form-control" id="inputScoreTeamOut" placeholder="Entrer le score extérieur">
        </div>
        <div class="form-group">
          <label for="inputHours">Heure du match</label>
          <input name="hours" type="text" class="form-control" id="inputHours" placeholder="Entrer l'heure">
        </div>
        <div class="form-group">
          <label for="inputLocalisation">Lieu du match</label>
          <input name="localisation" type="text" class="form-control" id="inputLocalisation" placeholder="Entrer le lieu du match">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>`
      )
      //transformer l'objet js en json sur ma route matchs/new
      const form = document.getElementById("add-match")
      form.addEventListener("submit", e => {
        e.preventDefault() //à tester sans et avec
        const data = serializeForm(form)  //la fonction récupère tous les champs d'un form et les récupère pr en faire objet js
        fetch("/matchs", {
          method: "POST",
          headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(match => {
            const alertBox = document.getElementById("alert-box")
            alertBox.className = "alert alert-success"
            alertBox.innerHTML = `Successfully created match ${match.teamHome} ${match.teamOut}`
          })
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
          <input name="nom" type="text" class="form-control" id="inputName" placeholder="Entrez votre nom">
        </div>
        <div class="form-group">
          <label for="inputPrenom">Prénom</label>
          <input name="prenom" type="text" class="form-control" id="inputPrenom" placeholder="Entrez votre prénom">
        </div>
        <div class="form-group">
          <label for="inputPseudo">Pseudo</label>
          <input name="pseudo" type="text" class="form-control" id="inputPseudo" placeholder="Entrez votre pseudo">
        </div>
        <div class="form-group">
          <label for="inputMail">E-mail</label>
          <input name="mail" type="e-mail" class="form-control" id="inputMail" placeholder="Entrez votre e-mail">
        </div>
        <div class="form-group">
          <label for="inputMotDePasse">Mot de passe</label>
          <input name="motdepasse" type="text" class="form-control" id="inputMotDePasse" placeholder="Choississez votre mot de passe">
        </div>
        <div class="form-group">
          <label for="inputConfirmationMotDePasse">Confirmation de mot de passe</label>
          <input name="confirmationmotdepasse" type="text" class="form-control" id="inputConfirmationMotDePasse" placeholder="Veuillez confirmer votre mot de passe">
        </div>
        <div class="form-group">
          <label for="inputCity">Votre ville</label>
          <input name="city" type="text" class="form-control" id="inputCity" placeholder="Entrez votre ville actuelle">
        </div>
        <div class="form-group">
          <label for="inputEquipePreferee">Votre équipe supportée pour le Mondial</label>
          <input name="equipepreferee" type="text" class="form-control" id="inputEquioePreferee" placeholder="Entrez votre équipe supportée">
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
            alertBox.innerHTML = `Successfully created wilder ${wilder.name} ${wilder.prenom}`
          })
      })
    },
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
        <p><a class="btn btn-success btn-lg" href="/matchs/new" role="button">Add a match »</a></p>
        <p><a class="btn btn-success btn-lg" href="/wilders/new" role="button">S'inscrire »</a></p>
        <p><a class="btn btn-success btn-lg" href="/mon-profil" role="button">Mon profil »</a></p>
        </div>
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
      "/matchs/new",
      "/wilders/new",
      "/mon-profil",
      "*"
    ]
    routes.forEach(
      path => page(path, controllers[path])
    )
    page()
  }

  //appel cette fonction pour gérer les routes
  routing()
