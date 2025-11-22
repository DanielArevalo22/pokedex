import PokemonStats from "../components/PokemonStats";
import { useEffect } from "react";
import { useState } from "react";
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
    <>
      <div className="flex">
        <div className="w-[50%] h-screen">
          <div className="flex">

            <Link to="/pokemon/inventory">
              <i class="fa-solid fa-2x fa-left-long ms-4 mt-8 text-black"></i>
            </Link>
            
            <div className="ms-[110px] flex space-x-4 mt-9 text-white font-semibold text-xl">
              
              {pokeType.map((typeObj) => (
              <p className="bg-blue-300 text-center w-[90px] rounded-xl h-[30px]"
                key={typeObj?.type?.name} >
                {typeObj?.type?.name}
              </p>
            ))}

            </div>

          </div>

          <PokemonStats pokemon={pokemon} className=""></PokemonStats>
        </div>
        <div className="w-[50%] h-screen bg-cover bg-center bg-[url('/bg-resource-plant.png')]">
          <div className="flex space-x-[50px] w-[400px] mx-auto">
            <span className="mt-[40px] font-semibold text-[30px]">
              {" "}
              # {pokemon.id}
            </span>
            <h1 className="text-center text-4xl font-bold mt-10">
              {pokemon.name}
            </h1>
            <a href="">
              <i className="fa-regular fa-heart fa-2x mt-[50px]"></i>
            </a>
          </div>

          <div className="flex justify-center pt-[100px]">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonInfo;
