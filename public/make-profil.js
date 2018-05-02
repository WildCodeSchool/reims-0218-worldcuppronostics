//renvoie le html d'une card bootstrap pour un wilder
const makeProfil = profil =>
  `
<div class="profil container" style="padding-top: 60px;">

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
          
<!-- Material form register -->
<form>
    <!-- Material input text -->
    <div class="md-form">
        <i class="fa fa-user prefix grey-text"></i>
        <input type="text" id="materialFormRegisterFirstNameEx" class="form-control">
        <label for="materialFormRegisterNameEx">${profil.prenom}</label>
    </div>

    <!-- Material input email -->
    <div class="md-form">
        <i class="fa fa-user prefix grey-text"></i>
        <input type="text" id="materialFormRegisterNameEx" class="form-control">
        <label for="materialFormRegisterEmailEx">${profil.nom}</label>
    </div>

    <!-- Material input email -->
    <div class="md-form">
    <i class="fa fa-user-circle-o prefix grey-text"></i>
        <input type="text" id="materialFormRegisterPseudoEx" class="form-control">
        <label for="materialFormRegisterConfirmEx">${profil.pseudo}</label>
    </div>

    <!-- Material input password -->
    <div class="md-form">
        <i class="fa fa-envelope prefix grey-text"></i>
        <input type="text" id="materialFormRegisterMailEx" class="form-control">
        <label for="materialFormRegisterPasswordEx">${profil.mail}</label>
    </div>

    <div class="md-form">
    <i class="fa fa-home prefix grey-text"></i>
        <input type="text" id="materialFormRegisterCityEx" class="form-control">
        <label for="materialFormRegisterPasswordEx">${profil.city}</label>
    </div>

     <!-- Material input password -->
     <div class="md-form">
        <i class="fa fa-lock prefix grey-text"></i>
        <input type="password" id="materialFormRegisterPasswordEx" class="form-control">
        <label for="materialFormRegisterPasswordEx">${profil.password}</label>
    </div>

     <!-- Material input password -->
     <div class="md-form">
        <i class="fa fa-lock prefix grey-text"></i>
        <input type="password" id="materialFormRegisterConfirmPasswordEx" class="form-control">
        <label for="materialFormRegisterPasswordEx">${profil.password}</label>
    </div>


    <div class="text-center mt-4">
        <button class="btn btn-primary" type="submit">Valider</button>
    </div>
</form>
<!-- Material form register -->
                      
      </div>
  </div>
</div>
</div>

  `

export default makeProfil
