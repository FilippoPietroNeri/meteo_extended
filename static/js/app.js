var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.submit');
var iconC = document.querySelector('#icon');
var humidity = document.querySelector('.humidity'); 
var wind = document.querySelector('.wind'); 
var pressure = document.querySelector('.pressure'); 

button.addEventListener('click', function (name) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=50a7aa80fa492fa92e874d23ad061374&units=metric`)
    .then(response => response.json())
    .then(data => {
      var tempValue = data['main']['temp'];
      var nameValue = data['name'];
      var descValue = data['weather'][0]['description'];
      var weatherIcon = data['weather'][0]['icon'];
      var humidityValue = data['main']['humidity'];
      var windValue = data['wind']['speed'];
      var pressureValue = data['main']['pressure'];

      main.innerHTML = nameValue;
      desc.innerHTML = `<strong>Description:</strong> ${descValue}`
      temp.innerHTML = `<strong>Temperature:</strong> ${tempValue}°C`
      humidity.innerHTML = `<strong>Humidity:</strong> ${humidityValue}%`;
      wind.innerHTML = `<strong>Wind Speed:</strong> ${windValue} m/s`;
      pressure.innerHTML = `<strong>Pressure:</strong> ${pressureValue} hPa`;

      iconC.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
      input.value = "";
    })
    .catch(err => alert("Nome della città inesistente"));
})