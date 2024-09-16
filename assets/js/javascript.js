const mainContent = document.createElement("section");
mainContent.classList.add("pokeDex");
document.body.appendChild(mainContent);

fetchPokemonList();

function fetchPokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      data.results.forEach((pokemon) => {
        fetchPokemonDetails(pokemon.url);
      });
    })
    .catch((error) => console.error("Fetching Pokémon list failed:", error));
}

function processPokemonList(pokeDex) {
  pokeDex.results.forEach((pokemon) => {
    fetchPokemonDetails(pokemon.url);
  });
}

function fetchPokemonDetails(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((pokemon) => {
      console.log(pokemon);

      sortPokemonDetails(pokemon);
    })
    .catch((error) => console.error("Fetching Pokémon details failed:", error));
}

function sortPokemonDetails(pokemon) {
  const name = pokemon.name;
  const image = pokemon.sprites.front_default;
  const types = pokemon.types.map((type) => type.type.name).join(", ");
  const id = pokemon.id;
  displayPokemon(name, image, types, id);
}

function sortPokemonDetails(pokemon) {
  const name = pokemon.name;
  const image = pokemon.sprites.front_default;
  const types = pokemon.types.map((type) => type.type.name).join(", ");
  const id = pokemon.id;
  displayPokemon(name, image, types, id);
}

function displayPokemon(name, image, types, id) {
  const pokemonCard = `
    <figure onclick="callBackPokemonCard('${id}')" class="pokemon ${name}">
      <img class="card-image" src="${image}" alt="${name}" />
      <figcaption>
        <h2 class="card-title">${name}</h2>
        <p class="card-subtitle">Type: ${types}</p>
      </figcaption>
    </figure>
  `;
  showMainContent(pokemonCard);
}

function showMainContent(html) {
  mainContent.innerHTML += html;
}
// Create and configure the button
const myButton = document.createElement("button");
myButton.textContent = "Fetch New Pokémon";
document.body.appendChild(myButton);

myButton.addEventListener("click", () => {
  mainContent.innerHTML = "";
  fetchPokemonList();
});

const myButton2 = document.createElement("button");
myButton2.textContent = "Reset New Pokémon";
document.body.appendChild(myButton2);

myButton2.addEventListener("click", () => {
  mainContent.innerHTML = "";
  let myHtml = "";
  myHtml += `<h1>Pokédex Reset</h1>`; // Reset message
  showMainContent(myHtml);
});

async function callBackPokemonCard(cardId) {
  console.log(`Clicked Pokémon ID: ${cardId}`);
}
