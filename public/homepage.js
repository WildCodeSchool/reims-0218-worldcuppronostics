//renvoie le html de la homepage

const homepage =
    `
    <div id="homepage" class="container home">
      <div class="row">
        <div id="logo_accueil" class=" col d-flex align-items-center rounded border border-white mx-1">
          <p class="text-center col">Seras-tu le meilleur pronostiqueur ?</p>
        </div>
      </div>
      <div id="explication_1" class="row mx-auto mt-4 d-flex align-items-center border border-white">
          <a class="btn btn-success btn-lg col-6 col-md-4 my-4 mx-auto" href="/wilders/new" role="button" id="link-signin">S'inscrire</a>
          <p class="text-center col-sm-12 col-md-6">Inscris-toi puis viens défier tes amis !</p>
      </div>
      <div id="explication_2" class="row mx-auto mt-4 d-flex align-items-center border border-white">
          <p class="text-center col-sm-12 order-2 col-md-6 order-md-1">Réalise tes pronostics !</p>
          <img src="assets/img/logoaccueil.jpg" class="col-sm-12 order-1 col-md-6 order-md-2 my-1" alt="example-bet">
      </div>
      <div id="explication_3" class="row mx-auto mt-4 d-flex align-items-center border border-white">
        <img src="assets/img/podium.jpg" class="mx-auto col-4 col-md-2 my-1 px-4" alt="example-bet">
        <p class="text-center col-sm-12 col-md-6">Domineras-tu le classement ?</p>
      </div>
    </div>
    `
export default homepage
