
export const makeMatch = match => `<li>${match.teamHome} - ${match.teamOut}</li>`

export const makeDisplayMatch = match => `
<div class="col-4 text-center">
	<div class="card mb-4 box-shadow">
		<div>
			<img class="card-img-top" src="" alt="Flag_teamHome"/>
			<p class="card-text" style="height: 30px">${match.teamHome}</p>
			<p class="card-text" style="height: 30px">${match.scoreTeamHome}</p>
		</div>
		<div>-</div>
		<div>
			<p class="card-text" style="height: 30px">${match.scoreTeamOut}</p>
			<p class="card-text" style="height: 30px">${match.teamOut}</p>
			<img class="card-img-top" src="" alt="Flag_teamOut"/>
		</div>
	</div>
</div>
`

const makeMatchsList = matchs => {
	`<div>This is my matches list</div>`
	let listHtml = ""
	for (let match of matchs) { 
		listHtml += makeMatch(match)
	}
	return `
			<ul>
				${listHtml}
			</ul>
	`
}
	 
export default makeMatchsList

export const makeHiddenButton = hiddenButton => `
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="container">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id=""></span>
          </div>
          <form>
            <input type="number" id="scoreTeamOne" name="equipeOne" value="0" min="0" max="15" class="form-control">
            <input type="number" id="scoreTeamTwo" name="equipeTwo" value="0" min="0" max="15" class="form-control">
            <input type="hidden" value="35">
          </form>
          <span class="input-group-text"></span>
        </div>
      </div>
    </div>
	</div>
</div>
`

