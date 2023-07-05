const url = 'https://api.thecatapi.com/v1';
const api_key = "live_FcpssCX9H7WABYUGsNiwRLRumKB20H9RdEt6hRiMDWkCinGFjGECDSZFCei21kb6";

export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
    
};

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
             return response.json();
        });
};

// ﻿export function fetchCountries(name) {
//     return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error(response.statusText);
//         });
// };