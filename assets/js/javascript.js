const mainContent = document.createElement("section");
mainContent.classList.add("pokeDex");
document.body.appendChild(mainContent);

fetchPokemonList(); // Initial fetch

async function fetchPokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";
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
  pokeDex.results.forEach((pokemon) => {
    fetchPokemonDetails(pokemon.url);
  });
}

async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const pokemon = await response.json();
    sortPokemonDetails(pokemon);
  } catch (error) {
    console.error(error.message);
  }
}

function sortPokemonDetails(pokemon) {
  const name = pokemon.name;
  const image = pokemon.sprites.front_default;
  const types = pokemon.types.map((type) => type.type.name).join(", ");
  displayPokemon(name, image, types);
}

function displayPokemon(name, image, types) {
  const pokemonCard = `
    <figure class="pokemon ${name}">
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
myButton.textContent = "Fetch New Pokémon"; // Button text updated
document.body.appendChild(myButton);

myButton.addEventListener("click", (e) => {
  mainContent.innerHTML = "";

  const pokemonCard = `<h1>dwadadwdwd</h1>
  `;
  showMainContent(pokemonCard);
});

const myButton2 = document.createElement("button");
myButton2.textContent = "Reset New Pokémon"; // Button text updated
document.body.appendChild(myButton2);

myButton2.addEventListener("click", (e) => {
  mainContent.innerHTML = "";
  fetchPokemonList();
});
