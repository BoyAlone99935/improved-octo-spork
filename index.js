const weatherform = document.querySelector('.weatherform')
const city = document.querySelector('.cityinput')
const card = document.querySelector('.card')
const APIkey = "a5f6215f8a0fa4e376d5c2f749f3cab7";


weatherform.addEventListener('submit',async event => {
event.preventDefault()
   

  const place = city.value;
  if (place) {
    const cityinput = city.value;
      try {
        const weatherdata = await getweatherdata(cityinput)
        displayweather(weatherdata)
      }
      catch(error) {
        console.error(error)
        displayerror(error)
      }
  }
  else{
    displayerror('please enter a city')
  }


})

async function getweatherdata(city) {
   const apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

   const response = await fetch(apiUrl)
   if (!response.ok) {
    throw new Error('could not fetch weather data')
   }
   else {
     return await response.json()
   }

  
}
function displayweather(data) {
  // VERY IMPORTANT IN USING API OBJECT DESTRUCTURING GET CONFUSED AND COMEBACK HERE
  console.log(data)
  const {name: city, main: {temp , humidity}, weather:[{description, id}] } = data

  card.textContent = ""
  card.style.display = 'flex'
  const citydisplay = document.createElement('h1')
  const tempdisplay = document.createElement('p')
  const humiditydisplay= document.createElement('p')
  const descdisplay = document.createElement('p')
  const weatherEmoji = document.createElement('h1')

  citydisplay.textContent = city
  citydisplay.classList.add('citydisplay')
  card.append(citydisplay)
  tempdisplay.textContent =` ${temp}C°`
  tempdisplay.classList.add('tempdisplay')
  card.append(tempdisplay)
  humiditydisplay.textContent = `humidity: ${humidity}%`
  humiditydisplay.classList.add('humiditydisplay')
  card.append(humiditydisplay)
  descdisplay.textContent = description
  descdisplay.classList.add('discriptiondisplay')
  card.append(descdisplay)
  weatherEmoji.textContent = getweatheremoji(id)
  weatherEmoji.classList.add('weatheremoji')
  card.append(weatherEmoji)
}
function getweatheremoji(weatherid) {
  switch(true) {
    case (weatherid >= 200 &&  weatherid < 300):
    return '⛈';
    case (weatherid >= 300 &&  weatherid < 400):
    return '🌧';
    case (weatherid >= 500 && weatherid < 600):
    return '🌧';
    case (weatherid >= 600 &&  weatherid < 700):
    return '❄';
    case (weatherid >= 700 && weatherid < 800):
    return '🌫';
    case (weatherid === 800):
    return '☀';
    case (weatherid >= 801):
    return '☁';
    default: 
    return "?"
  }
}
function displayerror(message) {
    const errordisplay = document.createElement('p')
    errordisplay.classList.add("errorDisplay")
    errordisplay.textContent = message
    card.appendChild(errordisplay)
}


const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Update button text
  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});

