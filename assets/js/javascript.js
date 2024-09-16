const mainContent = document.createElement("section");
const pokeDexContent = document.createElement("div");
pokeDexContent.classList.add("pokeDexContent");
mainContent.classList.add("pokeDex");
document.body.appendChild(mainContent);
mainContent.appendChild(pokeDexContent);

fetchPokemonList();

async function fetchPokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    processPokemonList(data);
  } catch (error) {
    console.error(error.message);
  }
}

function processPokemonList(pokeDex) {
  pokeDex.results.forEach((pokemon, index) => {
    fetchPokemonDetails(pokemon.url, index);
  });
}

async function fetchPokemonDetails(url, index) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const pokemon = await response.json();
    sortPokemonDetails(pokemon, index);
  } catch (error) {
    console.error(error.message);
  }
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
  pokeDexContent.innerHTML += html;
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
  myHtml += `<h1>dwadadwd</h1>`;
  showMainContent(myHtml);
});

async function callBackPokemonCard(cardId) {
  console.log(cardId);
}
