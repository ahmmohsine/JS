const { get } = require("lodash");

const apiKey = process.env.API_KEY;
const recherche = 'Allemagne';
const url = `https://api.restcountries.com/countries/v5/names.translations?q=`;
const authorization =`Bearer ${apiKey}`;
const capitale = document.querySelector('#capitale');
const image = document.querySelector('#image');
const population = document.querySelector('#population');
const monnaie = document.querySelector('#monnaie');
const continent = document.querySelector('#continent');
const nom = document.querySelector('#nom');
const region = document.querySelector('#region');
const drapeau = document.querySelector('#drapeau');
const searchBtn = document.querySelector('#search-button');
async function GetCountry(recherche) {
    const url = `https://api.restcountries.com/countries/v5/names.translations?q=${encodeURIComponent(recherche)}`;
    const response = await fetch(url,
        {
            headers: {
                'Authorization': authorization
            }
        }
    );
     if(!response.ok){
           pujs.alert('Non trouvée!', 'Error');

        }
        else
            {
                const data = await response.json();
                capitale.innerHTML = data.data.objects[0].capitals[0].name;
                image.src = data.data.objects[0].flag.url_png;
                drapeau.src = data.data.objects[0].flag.url_svg;
                population.innerHTML = data.data.objects[0].population;
                monnaie.innerHTML = data.data.objects[0].currencies[0].symbol;
                continent.innerHTML = data.data.objects[0].continents[0];
                nom.innerHTML = data.data.objects[0].names.official;
                region.innerHTML = data.data.objects[0].names.official;}
}
searchBtn.addEventListener('click',()=>{
    const recherche = document.querySelector('#country-search').value;
    GetCountry(recherche);
});