//renvoie le html d'une card bootstrap pour un match

  const makeCard = item => {
    console.log(item)
    //let buttonOrProno = ''
    // if pas de prono buttonOrProno = htmlButton
    // else prono
    // !item.pronoTeamHome return true if undefined or 0
    // object has key ?
      // console.log("pas de prono")
      return `
      <div class="card mx-auto mb-3" style="width: 18rem;">
        <div class="card-body text-center">
          <p> ${item.teamHome} </p>
          <img src="${item.drapeauHome}" style="width: 48px; height: 48px" class="rounded">
          <img src="${item.drapeauOut}" style="width: 48px; height: 48px" class="rounded">
          <p> ${item.teamOut} </p>
          <p class="idmatch"> ${item.id} </p>
          <p> ${item.localisation} </p>
          <p> ${item.numberMatch} </p>
        </div>
        <div class="text-center button-bet-display">
          <button type="button" data-index="${item.id}" data-teamHome="${item.teamHome}" data-teamOut="${item.teamOut}" data-drapeauHome="${item.drapeauHome}" data-drapeauOut="${item.drapeauOut}" data-localisation="${item.localisation}" data-numbermatch="${item.numberMatch}" class="btn btn-primary button-bet" data-toggle="modal" data-target=".bd-example-modal-lg">Pariez !</button>
        </div>
        <!-- Large modal -->
      </div>
      `
    }

export default makeCard
