// Qui dobbiamo dichiarare tutti i testi,bottoni,divs per poi porteli modificare
var input = document.querySelector('.input_text'); // document.querySelector(#nome oppure .nome) cioè trova tutti i tag con quella classe oppure quell'id
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.submit');
var sunset = document.querySelector('.sunset');
var sunrise = document.querySelector('.sunrise');
var humidity = document.querySelector('.humidity');
var pressure = document.querySelector('.pressure');
var wind = document.querySelector('.wind');

var iconC = document.querySelector('#icon');
var main = document.querySelector('#name');
var loading = document.querySelector('#loading');
var moreinfo = document.querySelector('#moreinfo');
var infobox = document.querySelector('#infobox');
var alertbox = document.querySelector('#alertbox');
var previsions = document.querySelector('#previsions');
var boxprev = document.querySelector('#boxprev');

var inputmeteo = document.getElementById('inputmeteo');
var infobtn = document.getElementById('infobtn');
var gotom = document.getElementById('gotom');

var currentLon, currentLat; // dobbiamo salvare i dati per porteli vedere sulle altre funzioni

function changeVisibility(tag, bool) // metodo per cambiare velocemente la visibilità dei tag usando lo style
{
  tag.style.display = bool ? "block" : "none" // Se bool è vero display diventa block (VISIBILE) oppure none (NON VISIBILE)
}

function handleMeteo() {
  changeVisibility(alertbox, false);
  changeVisibility(infobox, false);
  changeVisibility(boxprev, false);

  // Facciamo una "fetch" richiesta ad un API (Application Programming Interface) per trovare tutti i dati sulla città che abbiamo messo.
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=2c6d58519b7fb9e4e84c000b499d9cec&units=metric`)
    .then(response => response.json()) // trasformiamo la risposta in un json
    .then(data => {
      // dichiariamo tutte le variabili necessarie ottenendo i valori
      var tempValue = data['main']['temp'];
      var nameValue = data['name'];
      var descValue = data['weather'][0]['description'];
      var weatherIcon = data['weather'][0]['icon'];
      var humidityValue = data['main']['humidity'];
      var windValue = data['wind']['speed'];
      var pressureValue = data['main']['pressure'];
      var sunriseDate = data['sys']['sunrise'];
      var sunsetDate = data['sys']['sunset'];

      currentLon = data['coord']['lon'];
      currentLat = data['coord']['lat'];

      document.title = `${nameValue} Meteo | Little Meteo V2`
      // qua mettiamo i valori che abbiamo preso in precedente e applicarli ai tags scelti.
      main.innerHTML = nameValue;
      desc.innerHTML = `<strong>Description:</strong> ${descValue}`
      temp.innerHTML = `<strong>Temperature:</strong> ${tempValue}°C`
      humidity.innerHTML = `<strong>Humidity:</strong> ${humidityValue}%`;
      wind.innerHTML = `<strong>Wind Speed:</strong> ${windValue} m/s`;
      pressure.innerHTML = `<strong>Pressure:</strong> ${pressureValue} hPa`;
      sunrise.innerHTML =`<strong>Alba:</strong> ${new Date(sunriseDate * 1000).toLocaleString('en-US')} time`;
      sunset.innerHTML =`<strong>Tramonto:</strong> ${new Date(sunsetDate * 1000).toLocaleString('en-US')} time`;
      iconC.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
      input.value = "";
      changeVisibility(infobox, true);
      changeVisibility(loading, true);
      fetch(`https://openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLon}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`)
        .then(response => response.json()) // trasformiamo la risposta in un json
        .then(data => {
          var foredata = data['daily'];
          var listHTML = "";
          for (var i = 0; i < 7; i++) { // fa un loop della lista di Previsioni Giornaliere e ne ottiene 7 (una settimana).
            // Prende le variabili dal json
            var date_uni = new Date(foredata[i]['dt'] * 1000).toUTCString().slice(0, -17); // Arrotonda x 1000 il valore unix e converte a UTC + taglia il risultato per mostrare soltanto il Giorno, Mese e Numero
            var temp_min = Math.round(foredata[i]['temp']['min']);
            var temp_max = Math.round(foredata[i]['temp']['max']);
            var temp_ico = foredata[i]['weather'][0]['icon'];
            var temp_des = foredata[i]['weather'][0]['description'];

            // Qua sotto aggiunge a listHTML ogni <li> con le informazioni.
            listHTML += `<li class="lilist"><span>${date_uni}</span><div class="list-values"><div style="display: flex; justify-content: flex-start; align-items: center;"><img src="http://openweathermap.org/img/w/${temp_ico}.png" alt="${temp_des}"><span>${temp_max} / ${temp_min} °C</span></div><span>${temp_des}</span></div></li>`
          }
          // applica alle previsioni tutta la lista creata.
          previsions.innerHTML = listHTML;
          // cambia la visibilità di tutto.
          changeVisibility(boxprev, true);
          changeVisibility(loading, false);
        })
        .catch(err => {
          // Eseguito quando c'è un errore evidente.
          changeVisibility(boxprev, false);
          changeVisibility(alertbox, true);
          alertbox.innerHTML = "<b>Warning!</b> Impossibile ottenere le previsioni di questa città";
          input.value = "";
        })
    })
    .catch(err => {
      changeVisibility(alertbox, true);
      alertbox.innerHTML = "<b>Warning!</b> Nome della città inesistente"
      input.value = "";
      changeVisibility(infobox, false);
    }); // se la promise viene rifiutata manderà un alert 
}


// Aggiungiamo un listener che ascolta per i click dell'utente
button.addEventListener('click', function (name) {
  handleMeteo();
});

gotom.addEventListener('click', function (name) {
  document.location.href = `https://www.google.com/maps/@${currentLat},${currentLon},14z` // Redirecta la pagina su google maps con le Longitudini e Latitudini date
})

infobtn.addEventListener('click', function (name) {
  if (moreinfo.style.display == "block") { // Se il div delle informazioni è visibile allora lo rende invisibile
    moreinfo.style.display = "none";
    infobtn.textContent = "Show Info";
  } else if (moreinfo.style.display == "none") {
    moreinfo.style.display = "block";
    infobtn.textContent = "Hide Info"
  }
})

// Serve semplicemente per dire "Se l'utente clicca il pulsante ENTER quando è sull'input allora esegue il programma"
inputmeteo.addEventListener('keyup', function (event) {
  event.preventDefault();
  if (event.key === 'Enter') {
    handleMeteo();
  }
})

changeVisibility(infobox, false);