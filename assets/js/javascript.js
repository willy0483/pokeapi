const mainContent = document.createElement("section");
mainContent.classList.add("pokeDex");
document.body.appendChild(mainContent);

fetchPokemonList();

async function fetchPokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24";
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

function sortPokemonDetails(pokemon, index) {
  const name = pokemon.name;
  const image = pokemon.sprites.front_default;
  const types = pokemon.types.map((type) => type.type.name).join(", ");
  displayPokemon(name, image, types, index);
}

function displayPokemon(name, image, types, index) {
  const pokemonCard = `
    <figure onclick="pokemonCardItem('${name}')" class="pokemon ${name}">
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
  fetchPokemonList(); // Fetch new Pokémon when the button is clicked
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

async function pokemonCardItem(name) {
  console.log(name);
}
