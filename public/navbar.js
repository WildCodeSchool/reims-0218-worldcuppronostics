
const navBarNoLogin =
  ` <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color fixed-top scrolling-navbar">
  <img src="https://championnatdefrancedespronos.fr/scontent/images/FDJ_CFP_logo.png"></img>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent-3">
      <ul class="navbar-nav mr-auto">
          <li class="nav-item">
              <a class="nav-link waves-effect waves-light" href="/">Accueil
                  <span class="sr-only">(current)</span>
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link waves-effect waves-light" href="/rules">Règles</a>
          </li>
          <li class="nav-item">
              <a class="nav-link waves-effect waves-light" href="/ranking">Classement</a>
          </li>
        </ul>
      <li>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm" id="button-login">Se connecter</button>
          </li>
          <li>
          <a href="/wilders/new" role="button" type="button" class="btn btn-primary" id="link-signin">S'inscrire</a>

          </li>
  </div>
  <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="login-modal" aria-hidden="true">
      <div class="modal-dialog modal-sm">
          <div class="modal-content" id="modal-login">
          </div>
      </div>
  </div>
  </li>
  </ul>
  </div>
</nav>`

const navBarLogin =
  `
  <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color fixed-top scrolling-navbar">
  <img src="https://championnatdefrancedespronos.fr/scontent/images/FDJ_CFP_logo.png"></img>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
          <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                      <a class="nav-link waves-effect waves-light" href="/domyprono">Mes pronos
                          <span class="sr-only">(current)</span>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link waves-effect waves-light" href="/ranking">Classement</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link waves-effect waves-light" href="/dashboard">Tableau de bord</a>
                  </li>
              </ul>
      <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="true">
                  <i class="fa fa-user"></i> Mon compte </a>
              <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                  <a class="dropdown-item waves-effect waves-light" href="/mon-profil">Mes paramètres</a>
                  <a class="dropdown-item waves-effect waves-light" href="/logout">Se déconnecter</a>
              </div>
          </li>
      </ul>
  </div>
</nav>
  `


export { navBarLogin, navBarNoLogin}
