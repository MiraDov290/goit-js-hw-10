import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
const { selector, divCatInfo, loader, error } = refs;

loader.classList.replace('is-hidden', 'loader');
selector.classList.remove('is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');


fetchBreeds()
    .then(data => {
        const markup = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
        selector.innerHTML = markup;
        new SlimSelect({
            select: '.breed-select',
        });
        loader.classList.replace('loader', 'is-hidden');
    })
    .catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
      loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    divCatInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            loader.classList.replace('loader','is-hidden');
            selector.classList.remove('is-hidden');
            const { url, breeds } = data[0];
        
            divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
            divCatInfo.classList.remove('is-hidden');
        })
        .catch(onFetchError);
}


function onFetchError(error) {
    loader.classList.replace('loader', 'is-hidden');
    selector.classList.remove('is-hidden');

        Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
            position: 'center-center',
            timeout: 5000,
            width: '400px',
            fontSize: '24px'
        }); 
    }