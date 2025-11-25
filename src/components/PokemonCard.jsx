import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function PokemonCard({ pokemonData }) {
  const [pokemon, setPokemon] = useState({});
  const [pokeType, setPokeType] = useState([]);
  const [img, setImg] = useState(null);

  const typeBg = {
    grass: "/bg-resource-plant.png",
    fire: "/bg-resource-fire.png",
    water: "/bg-resource-water.png",
    electric: "/bg-resource-electric.png",
    dark:"/bg-resource-dark.png",
    bug:"/bg-resource-bug.png",
    normal:"/bg-resource-normal.png",
    ground:"/bg-resource-ground.png",
    default: "/bg-resource-plant.png",
  };

  const bgColorType = {
    grass: "#0ee6b7",
    fire: "#f26c05",
    water: "#5d89e8",
    electric: "#e0ed66",
    dark:"#6a0396",
    bug:"#996f45",
    normal:"#7d7b79",
    ground:"#593715",
    poison:"#A33EA1",
    default: "#525252",
  };

  const api = async () => {
    const response = await fetch(pokemonData.url);
    const data = await response.json();
    setPokeType(data.types);
    setImg(data.sprites.other.dream_world.front_default);
    setPokemon(data);
  };

  const primaryType = pokeType[0]?.type?.name;
  const bgUrl = typeBg[primaryType] || typeBg.default;
  const bgTypeStyle = bgColorType[primaryType] || bgColorType;
  

  useEffect(() => {
    api();
  }, []);

  return (
    <Link to={`/pokemon/info/${pokemon.name}`}>
      <div
        className="w-[250px] h-[125px] rounded bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <h1 className="text-white font-bold text-2xl font-sans ms-3 pt-2">
          {pokemon.name}
        </h1>
        <div className="flex">
          <div className="w-[90px] space-y-2 mt-3 ms-2">
            {pokeType.map((type, key) => {
              return (
                <div
                  className={`text-white text-center w-[70px] rounded-3xl`}
                  key={key}
                  style={{ backgroundColor: bgTypeStyle }}
                >
                  {type.type.name}
                </div>
              );
            })}
          </div>

          {img ? (
            <img src={img} className="ms-[50px] h-[80px]" />
          ) : (
            <Skeleton variant="rectangular" width={10} height={10}></Skeleton>
          )}
        </div>
      </div>
    </Link>
  );
}
