
const navBarNoLogin =
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
        
        <li class="nav-item">
          <a class="nav-link" href="/rules">Règles</a>
        </li>
      </ul>
        <a class="btn btn-success btn-lg" href="/wilders/new" role="button" id="link-signin">S'inscrire</a>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm" id="button-login">Se connecter</button>
        <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="login-modal" aria-hidden="true">
          <div class="modal-dialog modal-sm">
            <div class="modal-content" id="modal-login">
          </div>
        </div>
    </div>
  </nav>`

const navBarLogin =
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
          <a class="nav-link" href="/domyprono">Mes pronos
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/ranking">Classement</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/dashboard">Tableau de bord</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mon-profil">Mon profil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/rules">Règles</a>
        </li>
      </ul>
        <button class="btn btn-secondary rounded my-2 my-sm-0" id="button-logout" type="submit">Se déconnecter</button>
    </div>
  </nav>
  `


export { navBarLogin, navBarNoLogin}
