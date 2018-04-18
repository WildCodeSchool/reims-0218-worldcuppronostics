
export const makeMatch = match => `<li>${match.teamHome} - ${match.teamOut}</li>`

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

