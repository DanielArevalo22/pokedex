// ...existing code...
import { Link } from "react-router-dom";
import FilterOptions from "../components/FilterOptions";
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";

function PokemonList() {

  const [pokemons, setPokemons] = useState([])

  const api = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const data = await response.json();
      setPokemons(data.results || []);
   
  }

  const [filter, setFilter] = useState(false);

  const flag = () => {
    setFilter(!filter);
    console.log("filter toggled ->", !filter);
  };

  useEffect( () => {
    api();
  }, [])


  return (
    <>
      <div className="flex">
        <Link to="/">
          <i className="fa-solid fa-2x fa-left-long ms-4 mt-9 text-[#4c4b4b]"></i>
        </Link>
        <h1 className="font-bold text-3xl ms-4 mt-8 ">Pokedex</h1>
        <i
          className="fa-solid fa-sliders text-xl mt-8 ms-4 pt-1.5 bg-red-400 h-[40px] w-[40px] rounded-full hover:bg-gray-600 hover:text-white transtion duration-500"
          onClick={flag}
        ></i>
      </div>

      {filter && (
        <FilterOptions className=""></FilterOptions>
      )}

      

      <div className="grid grid-cols-5 content-between gap-4 ms-1.5 mt-5">
        {pokemons.map((pokemon, idx) => (
          
          // si espera name/url cambia aquí a: name={pokemon.name} urlPokemon={pokemon.url}
          <PokemonCard key={pokemon.name ?? idx} pokemonData={pokemon} />
        ))}
      </div>
    </>
  );
}

export default PokemonList;
