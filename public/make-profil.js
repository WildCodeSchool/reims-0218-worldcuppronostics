//renvoie le html d'une card bootstrap pour un wilder
const makeProfil = profil =>
  `<form>
  <div class="container form-profil">
  <div class="form-group">
  <label for="exampleFormControlInput1">Prénom</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="${profil.prenom}">
</div>
<div class="form-group">
<label for="exampleFormControlInput1">Nom</label>
<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="${profil.nom}">
</div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Adresse mail</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="${profil.mail}">
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Mot de passe</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="${profil.password}">
  </div>
  <button type="button" class="btn btn-success valid-profil">Validez</button>
  </div>
</form>`

export default makeProfil
