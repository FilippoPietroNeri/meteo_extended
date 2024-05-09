// Qui dobbiamo dichiarare tutti i testi,bottoni,divs per poi porteli modificare
var input = document.querySelector('.input_text'); // document.querySelector(#nome oppure .nome) cioè trova tutti i tag con quella classe oppure quell'id
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.submit');
var iconC = document.querySelector('#icon');
var humidity = document.querySelector('.humidity'); 
var wind = document.querySelector('.wind'); 
var pressure = document.querySelector('.pressure'); 

var alertbox = document.querySelector('#alertbox');
var infobox  = document.querySelector('#infobox');

var currentLon, currentLat; // dobbiamo salvare i dati per porteli vedere sulle altre funzioni

function changeVisibility(tag, bool) // metodo per cambiare velocemente la visibilità dei tag usando lo style
{
  tag.style.display = bool ? "block" : "none" // Se bool è vero display diventa block (VISIBILE) oppure none (NON VISIBILE)
}

function gotom()
{
  document.location.href = `https://www.google.com/maps/@${currentLat},${currentLon},14z`
}

changeVisibility(infobox, false);
button.addEventListener('click', function (name) { // Aggiungiamo un listener che ascolta per i click dell'utente
  changeVisibility(alertbox, false);
  // Facciamo una "fetch" richiesta ad un API (Application Programming Interface) per trovare tutti i dati sulla città che abbiamo messo.
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=50a7aa80fa492fa92e874d23ad061374&units=metric`)
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
      currentLon = data['coord']['lon']
      currentLat = data['coord']['lat']

      document.title = `${nameValue} Meteo | Little Meteo V2`
      // qua mettiamo i valori che abbiamo preso in precedente e applicarli ai tags scelti.
      main.innerHTML = nameValue;
      desc.innerHTML = `<strong>Description:</strong> ${descValue}`
      temp.innerHTML = `<strong>Temperature:</strong> ${tempValue}°C`
      humidity.innerHTML = `<strong>Humidity:</strong> ${humidityValue}%`;
      wind.innerHTML = `<strong>Wind Speed:</strong> ${windValue} m/s`;
      pressure.innerHTML = `<strong>Pressure:</strong> ${pressureValue} hPa`;
      iconC.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
      input.value = "";
      changeVisibility(infobox, true);
    })
    .catch(err => { 
      //alert("Nome della città inesistente")
      changeVisibility(alertbox, true);
      alertbox.innerHTML = "Nome della città inesistente"
      input.value = "";
      changeVisibility(infobox, false);
    }); // se la promise viene rifiutata manderà un alert 
})