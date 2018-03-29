const mainDiv = document.getElementById("main")


const render = html => {
  mainDiv.innerHTML = html
}

const makeCard = item => `
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${item.image}" alt="Thumbnail [100%x225]" />
      <div class="card-body">
        <p class="card-text" style="height: 80px">${item.teamHome}-${item.teamOut}</p>
        <p class="card-text" style="height: 80px">${item.scoreTeamHome}-${item.scoreTeamOut}</p>
      </div>
    </div>
  </div>`





const controllers = {

  "/": () =>
    fetch('/matchs')
    .then(res => res.json())
    .then(matchs => matchs.reduce((carry, match) => carry + makeCard(match), '')) 
    .then(album => render(
      `<div class="container">
        <div class="jumbotron">
          <h1 class="display-3">Hello, world!</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
          <p><a class="btn btn-primary btn-lg" href="/about" role="button">Learn more »</a></p>
          <p><a class="btn btn-success btn-lg" href="/users/new" role="button">Add a pirate »</a></p>
        </div>
        <div class="row">${album}</div>
      </div>`)
    )
    
,
  "/matchs/new": () => console.log('match/new')

,
  "*": () => render("<h1>Not Found</h1>")
  // toutes les autres routes sauf / on obtient en get NOT FOUND
}

const route = pathname => {

}


(() => {

  ["/", "/matchs/new", "*"].forEach(
    path => page(path, controllers[path])
  )
  page()
  // route()

})()
