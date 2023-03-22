import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

inputField.addEventListener('input', debounce(onInputField, DEBOUNCE_DELAY));

function onInputField() {
  const inputValue = inputField.value.trim();
  //   console.log(inputValue);

  cleanListCountry();
  cleanInfoCountry();

  if (inputValue !== '') {
    fetchCountries(inputValue).then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderListCountries(countries);
      } else if (countries.length === 1) {
        renderOneCountry(countries);
      }
    });
  }
}

function renderListCountries(countries) {
  const markup = countries
    .map(country => {
      return `
        <li>
            <img src='${country.flags.svg}' alt='Flag of ${country.name.official}' width='30' hight='30'>
            <p>${country.name.official}</p>
        </li>`;
    })
    .join('');
  listCountry.innerHTML = markup;
}
function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
            <img src='${country.flags.svg}' alt='Flag of ${
        country.name.official
      }' width='30' height='30'>
            <p>${country.name.official}
            <p><b>Capital:</b>${country.capital}</p>
            <p><b>Population:</b>${country.population}</p>
            <p><b>Languages:</b>${Object.values(country.languages).join(
              ','
            )}</p>
            </p>
        </li>
        `;
    })
    .join('');
  infoCountry.innerHTML = markup;
}
function cleanListCountry() {
  listCountry.innerHTML = '';
}

function cleanInfoCountry() {
  infoCountry.innerHTML = '';
}
