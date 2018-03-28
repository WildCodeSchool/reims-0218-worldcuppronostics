const blocPageDiv = document.getElementById("bloc_page")

const render = html => {
blocPageDiv.innerHTML = html
}

const match = {
  equipeADomicile: "France",
  equipeAExterieur: "Russie",
  scoreExterieur: "4",
  scoreDomicile: "6",
  lieu: "",
  heure: ""
}
document.getElementById("bloc_page").innerHTML = `${match.equipeADomicile}`;

document.getElementById ("bloc_page").innerHTML = `<div class="card-deck">
  <div class="card">
    <img class="card-img-top" src="https://www.france.fr/data/svg-flags/fr.svg" alt="Card image cap">
    <div class="card-body">
      <h2 class="card-title text-center">${match.equipeADomicile} - ${match.equipeAExterieur}</h2>
      <h3 class="card-text text-center">${match.scoreDomicile}-${match.scoreExterieur}</h3>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="..." alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="..." alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
</div>`
