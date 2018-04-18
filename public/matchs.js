
export const makeMatch = match => `<li>${match.teamHome} - ${match.teamOut}</li>`

const makeMatchsList = matchs => `
	<ul>
		<li>France - Italie</li>
		<li>Espagne - Belgique</li>
		<li>Angleterre - Bresil</li>
	</ul>
`
    	  
export default makeMatchsList

