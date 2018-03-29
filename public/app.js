const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const controllers = {

  '/': () => render('<h1>Pronostics</h1>')
,
  '*': () => render('<h1>Not Found</h1>')
}

const route = pathname => {
  console.log("salut")
}


(() => {

  ['/', '*'].forEach(
    path => page(path, controllers[path])
  )
  page()
  // route()

})()
