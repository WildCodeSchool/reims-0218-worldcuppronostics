//renvoie le html d'une card bootstrap pour un match

  const makeCard = item => {
    console.log(item);
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
        <!-- Large modal -->
        <div class="text-center">
          <button type="button" data-index="${item.id}" data-teamHome="${item.teamHome}" data-teamOut="${item.teamOut}" data-drapeauHome="${item.drapeauHome}" data-drapeauOut="${item.drapeauOut}" data-localisation="${item.localisation}" data-numbermatch="${item.numberMatch}" class="btn btn-primary button-bet" data-toggle="modal" data-target=".bd-example-modal-lg">Pariez !</button>
        </div>
      </div>
      `

    }
export default makeCard
