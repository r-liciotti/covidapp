const api = 'https://api.covid19api.com/summary';

const confermati = document.getElementById("confermati");
const ricoverati = document.getElementById("ricoverati");
const morti = document.getElementById("morti");





const getStato = async (string) => {
  const response = await fetch('https://api.covid19api.com/total/country/' + string + "'");
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(response.status);
  }
};


var myChart;
init();


function init(){
  fetch("https://api.covid19api.com/summary")
  .then(response => response.json())
  .then(result => {

    confermati.innerHTML = result.Global.NewConfirmed;
    ricoverati.innerHTML = result.Global.NewRecovered;
    morti.innerHTML = result.Global.NewDeaths;

     console.log(result.Global)
   }
)
  .catch(error => console.log('error', error));


}



function getSelect() {
  const stato = document.getElementById("stato").value;
  if (stato != "global") {
  const result = getStato(stato);


  result.then((data) => {
    // ------
    const last = data.length - 1;
    //console.log(data[last]);

    confermati.innerHTML = data[last].Confirmed;
    ricoverati.innerHTML = data[last].Recovered;
    morti.innerHTML = data[last].Deaths;

  })

  // ------
  var arrGiorni = [];
  var arrAttivi = [];
  var arrRicoverati = [];
  var arrMorti = [];

  result.then((data) => {
    for (var i = 0; i < data.length; i++) {
      arrGiorni[i] = data[i].Date.substring(0, 10)
      arrAttivi[i] = data[i].Active
      arrRicoverati[i] = data[i].Recovered
      arrMorti[i] = data[i].Deaths
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: arrGiorni,
        datasets: [{
          label: 'Attivi',
          data: arrAttivi,
          borderColor: '#3ec711',
          backgroundColor: '#3ec711',
          borderWidth: 1
        },
        {
          label: 'Ricoverati',
          data: arrRicoverati,
          borderColor: '#119dc7',
          backgroundColor: '#119dc7',
          borderWidth: 1
        },
        {
          label: 'Morti',
          data: arrMorti,
          borderColor: '#c12222',
          backgroundColor: '#c12222',
          borderWidth: 1
        }
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
}else {
  init();
}
  myChart.destroy();


}
