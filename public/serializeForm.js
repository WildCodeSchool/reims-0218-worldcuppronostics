//récuperer tous les champs d'un formulaire pour en faire un object js
const serializeForm = form => {
  const data = {}
  const elements = form.getElementsByClassName("form-control")
  for (let el of elements) {
    data[el.name] = el.value
  }
  return data
}


export default serializeForm
