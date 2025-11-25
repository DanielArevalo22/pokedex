import PokemonStats from "../components/PokemonStats";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams, Link } from "react-router-dom";

function PokemonInfo() {
  const [pokemon, setPokemon] = useState({});
  const [img, setImg] = useState(null);
  const [pokeType, setPokeType] = useState([]);
  const { name } = useParams();

  const api = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    setPokemon(data);
    setImg(data.sprites.other.dream_world.front_default);
    setPokeType(data.types);
  };

  useEffect(() => {
    api(name);
  }, []);

  return (
    <div className="bg-gradient-to-br from-teal-100 via-white to-teal-200 font-sans min-h-screen">
      <div className="flex">
  
        <div className="lg:w-1/2 w-full px-6 py-10 bg-white shadow-inner relative">
          <div className="flex items-center mb-6">
            <Link to="/pokemon/inventory">
              <i className="fa-solid fa-left-long fa-2x text-gray-600 hover:text-teal-600 transition-colors"></i>
            </Link>
          </div>

          <div className="flex justify-center">
            <PokemonStats pokemon={pokemon} />
          </div>
        </div>
        <div className="w-[50%] h-screen  bg-[url('/bg-resource-plant.png')] bg-cover bg-center relative">
          <div className="flex flex-col items-center pt-10 space-y-4">
            <span className="text-gray-700 font-semibold text-2xl"># {pokemon.id}</span>
            <h1 className="text-5xl font-bold capitalize text-white drop-shadow-md">
              {pokemon.name}
            </h1>
            <div className="flex space-x-3">
              {pokeType.map((typeObj) => (
                <span
                  key={typeObj?.type?.name}
                  className="bg-green-200 text-green-800 font-semibold px-4 py-1 rounded-full shadow-sm text-sm"
                >
                  {typeObj?.type?.name}
                </span>
              ))}
            </div>

            {img ? (
              <img src={img} alt={pokemon.name} className="w-[250px] h-[250px] mt-10 drop-shadow-xl hover:scale-100 transition-transform duration-300"/>
            ):(
              <Skeleton variant="rectangular" width={10} height={10}></Skeleton>
            )}
            <button className="absolute top-6 right-6 hover:scale-105 transition-transform">
              <i className="fa-regular fa-heart fa-2x text-red-500"></i>
            </button>
          </div>
        </div>

        
        
      </div>
    </div>
  );
}

export default PokemonInfo;
