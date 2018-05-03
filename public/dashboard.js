const matchAdmin = {
  id: 1,
  wilderId: 1,
  matchId: 2,
  teamHome: "Russie",
  teamOut: "Arabie Saoudite",
  pronoTeamHome: 1,
  pronoTeamOut: 0,
}

const matchWilder1 = {
  id: 2,
  wilderId: 2,
  matchId: 2,
  teamHome: "Russie",
  teamOut: "Arabie Saoudite",
  pronoTeamHome: 3,
  pronoTeamOut: 0,
  }

const matchWilder2 = {
  id: 3,
  wilderId: 3,
  matchId: 2,
  teamHome: "Russie",
  teamOut: "Arabie Saoudite",
  pronoTeamHome: 3,
  pronoTeamOut: 0,
}
    
const points = {
  resultatBon : 50,
  scoreExact : 100,
}

let resultatAdmin =""
let resultatWilder =""
let numberPoints = 0

let exampleMatch = 
`
<div class="titledashboard text-center display-4 text-light mt-5 mb-5"><u> Tes résultats</u></div>
  <div class="dashboard container">
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-10 col-md-4 bg-light text-center"> ${matchWilder1.teamHome} ${matchWilder1.pronoTeamHome} - ${matchWilder1.pronoTeamOut} ${matchWilder1.teamOut}
      </div>
      <div class="col-10 col-md-4 bg-light text-center">Score exact: ${matchAdmin.pronoTeamHome} - ${matchAdmin.pronoTeamOut}
      </div>
      <div class="col-10 col-md-4 bg-warning text-center">
        + 50 points
      </div>
    </div>
  </div>
  <div class="dashboard container">
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-10 col-md-4 bg-light text-center"> ${matchWilder2.teamHome} ${matchWilder2.pronoTeamHome} - ${matchWilder2.pronoTeamOut} ${matchWilder2.teamOut}
      </div>
      <div class="col-10 col-md-4 bg-light text-center text-success">Score exact: ${matchAdmin.pronoTeamHome} - ${matchAdmin.pronoTeamOut}
      </div>
    <div class="col-10 col-md-4 bg-success text-center">
      + 150 points
      </div>
    </div>
  </div>
  <div class="dashboard container">
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-10 col-md-4 bg-light text-center"> Egypte  ${matchWilder2.pronoTeamOut} - ${matchWilder2.teamHome} ${matchWilder2.pronoTeamHome}
      </div>
      <div class="col-10 col-md-4 bg-light text-center text-danger">Score exact: 3 - 0
      </div>
      <div class="col-10 col-md-4 bg-danger text-center">
        + 0 point
      </div>
    </div>
  </div>
</div>
  `


// if (matchAdmin.pronoTeamHome > matchAdmin.pronoTeamOut)
//   {resultatAdmin = "victoire"}
// else if (matchAdmin.pronoTeamHome === matchAdmin.pronoTeamOut)
//   {resultatAdmin = "matchnul"}
// else resultatAdmin = "defaite"

// if (matchWilder1.pronoTeamHome > matchWilder1.pronoTeamOut)
//   {resultatWilder = "victoire"}
// else if (matchWilder1.pronoTeamHome === matchWilder1.pronoTeamOut)
//   {resultatWilder = "matchnul"}
// else resultatWilder = "defaite"

// if (matchAdmin.pronoTeamHome === matchWilder1.pronoTeamHome && matchAdmin.pronoTeamOut === matchWilder1.pronoTeamOut)
// {console.log("le prono est bon  !!")
// numberPoints += 100}
// else  console.log("le prono est faux")

// if (resultatAdmin === resultatWilder)
//   {numberPoints += 50}

// console.log(resultatAdmin)
// console.log(resultatWilder)


// if (numberPoints === 150)
//   { exampleMatch = 
//   `
//   <div class="dashboard container">
//     <div class="row d-flex justify-content-center mb-4">
//       <div class="col-10 col-md-4 bg-light text-center"> ${matchWilder1.teamHome} ${matchWilder1.pronoTeamHome} - ${matchWilder1.pronoTeamOut} ${matchWilder1.teamOut}
//       </div>
//       <div class="col-10 col-md-4 bg-light text-success text-center text-success">Score exact: ${matchAdmin.pronoTeamHome} - ${matchAdmin.pronoTeamOut}
//       </div>
//       <div class="col-10 col-md-4 bg-success text-center">
//         + ${numberPoints} points
//       </div>
//     </div>
//   </div>`
// }

// if (numberPoints === 50)
//   { exampleMatch = 
//   `
//   <div class="dashboard container">
//     <div class="row d-flex justify-content-center mb-4">
//       <div class="col-10 col-md-4 bg-light text-center"> ${matchWilder1.teamHome} ${matchWilder1.pronoTeamHome} - ${matchWilder1.pronoTeamOut} ${matchWilder1.teamOut}
//       </div>
//       <div class="col-10 col-md-4 bg-light text-center text-danger">Score exact: ${matchAdmin.pronoTeamHome} - ${matchAdmin.pronoTeamOut}
//       </div>
//       <div class="col-10 col-md-4 bg-warning text-center">
//         + ${numberPoints} points
//       </div>
//     </div>
//   </div>`
// }

// if (numberPoints === 0)
//   { exampleMatch = 
//   `
//   <div class="dashboard container">
//     <div class="row d-flex justify-content-center mb-4">
//       <div class="col-10 col-md-4 bg-light text-center"> ${matchWilder1.teamHome} ${matchWilder1.pronoTeamHome} - ${matchWilder1.pronoTeamOut} ${matchWilder1.teamOut}
//       </div>
//       <div class="col-10 col-md-4 bg-light text-danger text-center text-success">Score exact: ${matchAdmin.pronoTeamHome} - ${matchAdmin.pronoTeamOut}
//       </div>
//       <div class="col-10 col-md-4 bg-danger text-center">
//         + ${numberPoints} points
//       </div>
//     </div>
//   </div>`
// }


export default exampleMatch