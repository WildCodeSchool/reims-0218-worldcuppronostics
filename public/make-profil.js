//renvoie le html d'une card bootstrap pour un wilder
const makeProfil = profil =>
  `
<div class="container" style="padding-top: 60px;">

  <div class="row">
      <!-- left column -->
      <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="text-center">
              <img src="https://media.licdn.com/dms/image/C4D03AQE1f8XY5CkayQ/profile-displayphoto-shrink_800_800/0?e=1528707600&v=beta&t=5rLhsfXCegNLMpxjWWXyGfrkBHLHZCI9tIa9gYfbd5g"
                  class="avatar img-circle img-thumbnail" alt="avatar">
              <p>Changer d'avatar ci-dessous</p>
              <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile">
                  <label class="custom-file-label" for="customFile">Choisis ton avatar</label>
              </div>
          </div>
      </div>
      <!-- edit form column -->
      <div class="col-md-8 col-sm-6 col-xs-12 personal-info">
          <div class="alert alert-info alert-dismissable">
              <a class="panel-close close" data-dismiss="alert">×</a>
              <i class="fa fa-coffee"></i>
              Tu as modifier ton
              <strong>profil</strong> avec succès!
          </div>
          <h3>Mes informations:</h3>
          <form class="form-horizontal" role="form">
              <div class="form-group">
                  <label class="col-lg-3 control-label">Prénom:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.prenom}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-lg-3 control-label">Nom:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.nom}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-lg-3 control-label">Pseudo:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.pseudo}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-lg-3 control-label">Email:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.mail}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-lg-3 control-label">Ville:</label>
                  <div class="col-lg-8">
                      <input class="form-control" value="${profil.city}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-md-3 control-label">Ton équipe favorite:</label>
                  <div class="col-md-8">
                      <input class="form-control" value="${profil.equipepreferee}" type="text">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-md-3 control-label">Mot de passe:</label>
                  <div class="col-md-8">
                      <input type="password" class="form-control" value="11111122333" name="passport">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-md-3 control-label">Confirmation du mot de passe:</label>
                  <div class="col-md-8">
                      <input type="password" class="form-control" value="11111122333" name="passport">
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-md-3 control-label"></label>
                  <div class="col-md-8">
                      <input class="btn btn-outline-success" value="Valider" type="button">
                      <input class="btn btn-outline-danger" value="Annuler" type="button">
                  </div>
              </div>
          </form>
      </div>
  </div>
</div>
</div>

  `

export default makeProfil
