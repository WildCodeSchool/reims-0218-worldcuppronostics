const mainDiv = document.getElementById("main")


const render = html => {
  mainDiv.innerHTML = html
}

const controllers = {

  "/": () =>
    fetch('/matchs')
    .then(res => res.json())
    .then(matchs => console.log(matchs))
      
  
   
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
