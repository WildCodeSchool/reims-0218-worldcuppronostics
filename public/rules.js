const rulespage =
`
<div id="rules" class="container rules d-flex justify-content-center">
  <div class="col-6 text-center border border-light">
    <p class="mt-1 text-uppercase">réglement pronostics</p>
    <p class="text-uppercase">COUPE DU MONDE 2018</p>
    <p class="text-uppercase">du 14 juin au 15 juillet</p>
    <p class="text-uppercase mb-1">russie</p>
  </div>
</div>
<div class="explication_of_the_game container mt-4">
  <div class="row text-center">
    <p class="my-0 col-12">Tu en rêvais ? Nous l'avons fait !</p>
    <p class="my-0 col-12">Même si tu penses que l'Italie gagnera la prochaine Coupe du Monde, tu peux t'inscrire.</p>
    <p class="my-0 col-12">A travers cette compétition amicale, tu pourras épater tes amis et devenir le meilleur pronostiqueur.</p>
    <p class="my-0 col-12">Nous vous attendons très nombreux (une récompense sera définie en fonction du nombre d'inscrits).</p>
  </div>
</div>
<div class="container mt-4 d-flex justify-content-center">
  <div id="accordion" class="col-9 bg-light px-0">
    <div class="card">
      <div class="card-header bg-light text-center" id="butdujeu">
        <h5 class="mb-0">
          <button class="btn btn-primary" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            But du jeu
          </button>
        </h5>
      </div>

      <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
        <div class="card-body bg-light text-center">
          <p class="text-dark">Le vainqueur sera celui qui aura cumulé le plus de points sur les 48 pronostics de la phase de poules. En cas d'égalité, les joueurs partageront la récompense.</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header bg-light text-center" id="headingTwo">
        <h5 class="mb-0">
          <button class="btn btn-primary collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Déroulement
          </button>
        </h5>
      </div>
      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
        <div class="card-body bg-light text-center">
          <p class="text-dark">1. Dès que ton inscription est faite, tu peux alors accèder aux 48 pronostics de la phase de poules. Pas de panique, tu n'es pas obligé de faire les 48 matchs en une seule fois. Tu peux revenir demain pour finir.</p>
          <p class="text-dark">2. Maintenant le plus dur sera d'attendre le 14 juin pour le premier match Russie - Arabie Saoudite.</p>
          <p class="text-dark">3. Tu dois faire les pronostics pour les 48 matchs. Tu dois inscrire le score exact. Tu gagneras des points si tu as bien pronostiqué sur la victoire, nul ou défaite et si tu as le score exact.</p>
          <p class="text-dark">4. Le match Russie - Arabie Saoudite est fini. Tu obtiens alors dans ta page "Tableau de bord" le récapitulatif des points obtenus pour ce match.</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header bg-light text-center" id="headingThree">
        <h5 class="mb-0">
          <button class="btn btn-primary collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Les points
          </button>
        </h5>
      </div>
      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <div class="card-body bg-light text-center">
          <p class="text-dark text"><u>Exemple:</u></p>
          <p class="text-dark">La russie a gagné 3-0 contre l'Arabie Saoudite</p>
          <p class="text-dark">Ton pronostic était une victoire 2-0 de la Russie</p>

          <p class="text-dark"><u>Tu obtiens:</u></p>
          <p class="text-success">Victoire de la Russie => 50 points</p>
          <p class="text-danger">Score exact : Non => 0 points</p>

          <p class="text-dark">Si tu avais pronostiqué 3-0, tu aurais eu 150 points car le score exact te rapporte 100 points</p>

          <div class="bg-danger border border-dark">
          <p class="text-light"><strong>Pronostic VICTOIRE/NUL/DEFAITE correct = 50 points</strong></p>
          <p class="text-light"><strong>Score exact = 100 points</strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
export default rulespage
