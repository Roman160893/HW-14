const button = document.querySelector('.actors__button')
const content = document.querySelector('.content')
const buttonPlanets = document.querySelector('.planets__button')
const buttonNextPlanets = document.querySelector('.next__planets')
const buttonPreviousPlanets = document.querySelector('.previous__planets')

const BASE_URL = 'https://swapi.dev/api/films';
let baseUrlPlanets = 'https://swapi.dev/api/planets/?page=1'

// Функція вибору персонажів
async function getСharacters() {
   const inputNumberFilms = document.querySelector('.input__films');
   if (inputNumberFilms.value < 1 || inputNumberFilms.value > 6) return alert('Ви ввели невірне значення')
   const requestPeople = await fetch(`${BASE_URL}/${inputNumberFilms.value}`);
   const loading = document.querySelector(".loader");
   loading.classList.remove("loader__none");
   const responsePeople = await requestPeople.json();
   const filmCharacters = responsePeople.characters;
   let charactersDom = '';
   for (let i = 0; i < filmCharacters.length; i++) {
      const filmCharactersRequest = await fetch(filmCharacters[i]);
      const filmCharactersResponse = await filmCharactersRequest.json();
      charactersDom += `<div class="style__characters">
      <p class="characters__info"> Name: ${filmCharactersResponse.name}</p> 
      <p class="characters__info"> Birth Year: ${filmCharactersResponse.birth_year}
      <p class="characters__info"> Gender: ${filmCharactersResponse.gender} </div>`
   }
   loading.classList.add("loader__none");
   content.innerHTML = charactersDom
}
// Функція вибору планет
async function getPlanets() {
   const loading = document.querySelector(".loader");
   loading.classList.remove("loader__none");
   const request = await fetch(baseUrlPlanets);
   const response = await request.json()
   let infoPlanet = response.results;
   let resultPlanet = '';
   infoPlanet.forEach((el) => {
      resultPlanet += `<p class='planets__info'>${el.name}</p>`
   })
   loading.classList.add("loader__none");
   content.innerHTML = resultPlanet;
}
// Функція наступної планет
async function getNextPlanets() {
   const request = await fetch(baseUrlPlanets);
   const response = await request.json()
   if (!response.next) return
   baseUrlPlanets = response.next
   getPlanets()
}
// Функція попередньої планет
async function getPreviousPlanets() {
   const request = await fetch(baseUrlPlanets);
   const response = await request.json()
   if (!response.previous) return
   baseUrlPlanets = response.previous
   getPlanets()
}
// Навішування подій на кнопки
button.addEventListener('click', getСharacters);
buttonPlanets.addEventListener('click', getPlanets);
buttonNextPlanets.addEventListener('click', getNextPlanets)
buttonPreviousPlanets.addEventListener('click', getPreviousPlanets)


