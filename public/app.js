const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const controllers = {

  '/': () => console.log("blabal")
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
