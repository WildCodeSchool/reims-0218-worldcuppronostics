const mainDiv = document.getElementById("main")


const render = html => {
  mainDiv.innerHTML = html
}

const controllers = {

  '/': () =>
    fetch('/matchs')
    .then(res => 
      console.log(res.json())
  )
   
,
  "/matchs/new": () => render("<h2>TANGUY</h2>")

,
  "*": () => render("<h1>Not Found</h1>")
  // toutes les autres routes sauf / on obtient en get NOT FOUND
}

const route = pathname => {
  console.log("salut")
}


(() => {

  ["/", "/matchs/new", "*"].forEach(
    path => page(path, controllers[path])
  )
  page()
  // route()

})()
