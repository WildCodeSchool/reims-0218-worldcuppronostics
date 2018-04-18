
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

