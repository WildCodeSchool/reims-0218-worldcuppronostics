//renvoie le html de la homepage

const homepage = item => {
    return `
    <div id="homepage" class="container">
      <div class="row">
        <div id="logo_accueil" class=" col d-flex align-items-center rounded border border-white mx-1">
          <a class="text-center col">Seras-tu le meilleur pronostiqueur ?</a>
        </div>
      </div> 
      <div id="explication_1" class="row mx-auto mt-4 d-flex align-items-center border border-white">
          <a class="btn btn-success btn-lg col-6 col-md-4 my-4 mx-auto" href="/wilders/new" role="button" id="link-signin">S'inscrire</a>
          <a class="text-center col-sm-12 col-md-6">Inscris-toi puis viens défier tes amis !</a>
      </div>
      <div id="explication_2" class="row mx-auto mt-4 d-flex align-items-center border border-white">
          <a class="text-center col-sm-12 order-2 col-md-6 order-md-1">Réalise tes pronostics !</a>
          <img src="../ressources/logoaccueil.jpg" class="col-sm-12 order-1 col-md-6 order-md-2 my-1" alt="example-bet">
      </div>
      <div id="explication_3" class="row mx-auto mt-4 d-flex align-items-center border border-white">
        <img src="../ressources/podium.jpg" class="mx-auto col-4 col-md-2 my-1 px-4" alt="example-bet">  
        <a class="text-center col-sm-12 col-md-6">Domineras-tu le classement ?</a>
      </div>  
    </div> 
    `

  }
export default homepage