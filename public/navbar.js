
const navBarNoLogin = () => {
  `<nav class="navbar navbar-expand-lg navbar-defaultnavbar navbar-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="/">
        <img src="https://championnatdefrancedespronos.fr/scontent/images/FDJ_CFP_logo.png"></img>
      </a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="/">Mes pronos
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/classement">Classement</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/tableau de bord">Tableau de bord</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mon-profil">Mon profil</a>
        </li>
      </ul>
        <button class="btn btn-success btn-lg" href="/wilders/new" role="button">S'inscrire</button>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm" id="button-login">Se connecter</button>
    </div>
  </nav>`
}

const navBarLogin = () => {
  `
  <nav class="navbar navbar-expand-lg navbar-defaultnavbar navbar-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="/">
        <img src="https://championnatdefrancedespronos.fr/scontent/images/FDJ_CFP_logo.png"></img>
      </a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="/">Mes pronos
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/classement">Classement</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/tableau de bord">Tableau de bord</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mon-profil">Mon profil</a>
        </li>
      </ul>
        <button class="btn btn-secondary rounded my-2 my-sm-0" type="submit">Se déconnecter</button>
    </div>
  </nav>
  `
}


export { navBarLogin, navBarNoLogin}
