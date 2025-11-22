import { Link } from "react-router-dom";
import FilterOptions from "../components/FilterOptions";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=50");

  const [filter, setFilter] = useState(false);

  const flag = () => {
    setFilter(!filter);
    console.log("filter toggled ->", !filter);
  };

  const api = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      let list = [];

      if (data.results) {
        list = data.results;
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      } else if (data.pokemon) {
        list = data.pokemon.map((p) => p.pokemon);
        setNextUrl(null);
        setPrevUrl(null);
      } else if (data.pokemon_species) {
        list = data.pokemon_species.map((p) => ({
          name: p.name,
          url: `https://pokeapi.co/api/v2/pokemon/${p.name}`,
        }));
        setNextUrl(null);
        setPrevUrl(null);
      }
      setPokemons(list);
    } catch (err) {
      console.error("Error fetching pokemons:", err);
    }
  };


  useEffect(() => {
    api(currentUrl);
  }, [currentUrl]);

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
        <FilterOptions
          onFilter={(url) => {
            setCurrentUrl(url);
          }}
        />
      )}

      <div className="grid grid-cols-5 content-between gap-4 ms-1.5 mt-5">
        {pokemons.map((pokemon, idx) => (
          <PokemonCard key={pokemon.name ?? idx} pokemonData={pokemon} />
        ))}
      </div>

      <Pagination next={nextUrl} prev={prevUrl} onPageChange={(url) => setCurrentUrl(url)} />

    </>
  );
}

export default PokemonList;
