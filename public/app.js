const blocPageDiv = document.getElementById("bloc_page")

const render = html => {
  blocPageDiv.innerHTML = html
}


const controllers = {
  "*" : () => render("<h1> kzqkldqz </h1>")
}
