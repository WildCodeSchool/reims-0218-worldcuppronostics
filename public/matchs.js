
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

export const makeMatchsList = matchs => {
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
	 
const makeHiddenButton = match =>`
<div class="card mx-auto mb-3" style="width: 18rem;">
	<div class="card-body text-center">
		<p> ${match.teamHome}</p>
		<img src="http://flags.fmcdn.net/data/flags/w580/ru.png" style="width: 48px; height: 48px; class="rounded">
		<img src="http://flags.fmcdn.net/data/flags/w580/ru.png" style="width: 48px; height: 48px;" class="rounded">
		<p> ${match.teamOut} </p>
		<p class="idmatch"> ${match.name}</p>
		<p>${match.localisation}</p>
	</div>
	<!-- Large modal -->
	<div class="text-center">
		<button type="button" data-index="1" data-teamHome="Russie" data-teamOut="Italie" data-drapeauHome="" data-drapeauOut="" data-localisation="" class="btn btn-primary button-bet" data-toggle="modal" data-target=".bd-example-modal-lg">Pariez !</button>
	</div>
</div>
`
export default makeHiddenButton