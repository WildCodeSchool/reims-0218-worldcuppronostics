const mainDiv = document.getElementById("main")


const render = html => {
  mainDiv.innerHTML = html
}
//renvoie le html d'une card bootstrap pour un match
const makeCard = item => `
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${item.image}" alt="Match" />
      <div class="card-body">
        <p class="card-text" style="height: 80px">${item.teamHome}-${item.teamOut}</p>
        <p class="card-text" style="height: 80px">${item.scoreTeamHome}-${item.scoreTeamOut}</p>
      </div>
    </div>
  </div>`

  //récuperer tous les champs d'un formulaire pour en faire un object js
  const serializeForm = form => {
    const data = {}
    const elements = form.getElementByClassName("form-control")
    for(el of elements) {
      data[el.name] = el.value
    }
    return data
  }

//routing côté
const controllers = {

  "/": () =>
    fetch("/matchs")
      .then(res => res.json())
      .then(matchs => matchs.reduce((carry, match) => carry + makeCard(match), ""))
      .then(album => render(
        `<div class="container">
        <div class="jumbotron">
          <h1 class="display-3">Hello, world!</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
          <p><a class="btn btn-primary btn-lg" href="/about" role="button">Learn more »</a></p>
          <p><a class="btn btn-success btn-lg" href="/matchs/new" role="button">Add a pirate »</a></p>
        </div>
        <div class="row">${album}</div>
      </div>`)
      )
  ,
  "/matchs/new": () => render(
    `<div class="container">
      <div id="alert-box" class="hidden">
      </div>
      <form id="add-pirate">
        <div class="form-group">
          <label for="inputFirstName">First name</label>
          <input name="firstName" type="text" class="form-control" id="inputFirstName" placeholder="Enter first name">
        </div>
        <div class="form-group">
          <label for="inputLastName">Last name</label>
          <input name="lastName" type="text" class="form-control" id="inputLastName" placeholder="Enter last name">
        </div>
        <div class="form-group">
          <label for="inputImageUrl">Image URL</label>
          <input name="image" type="text" class="form-control" id="inputImageUrl" placeholder="Enter image URL">
        </div>
        <div class="form-group">
          <label for="inputBio">Bio</label>
          <textarea name="bio" class="form-control" id="inputLastName" placeholder="Bio"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>`
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
    "*"
  ]
  routes.forEach(
    path => page(path, controllers[path])
  )
  page()
}

//appel cette fonction pour gérer les routes
routing()

