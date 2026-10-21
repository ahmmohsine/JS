const API = 'https://pokeapi.co/api/v2';
let message = document.querySelector('#message');
let image = document.querySelector('#image');
let nom = document.querySelector('#nom');
async function chargerPokemon(nom) {
const response = await fetch(`${API}/pokemon/${nom}`);
if(!response.ok){
    message.innerHTML = 'Erreur de chargement' + response.status;
}else{
    const pokemon = await response.json();
    image.src = pokemon.sprites.front_default;
    console.log(pokemon.name, pokemon.height);
}
}
async function getAllPokemons(count=20) {
    const APIALLPOKEMON = 'https://pokeapi.co/api/v2/pokemon?offset='+count+'&limit='+count;
    const response = await fetch(`${APIALLPOKEMON}`);
    if(!response.ok){
        message.innerHTML = 'Erreur de chargement' + response.status;
    }else{
        const pokemons = await response.json();
        return [...pokemons.results];
    }
}
async function afficherPokemons(url) {
    const response = await fetch(url);
    if(response.ok){
        const result =await response.json();
        console.log(result.sprites);
        image.src = result.sprites.other['official-artwork'].front_default;
        nom.innerHTML = result.name;
    }else{

    }
}
const dropdown = document.querySelector('#pokemons');
getAllPokemons().then(pokemons => {
    console.log(pokemons);
    pokemons.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon.url;
        option.textContent = pokemon.name;
        dropdown.appendChild(option);
    });

});
dropdown.addEventListener('change', () => {
    afficherPokemons(dropdown.value);
});

