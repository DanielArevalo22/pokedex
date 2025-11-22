import { useState } from "react";

const optionsTabla = [
  { id: "about", label: "About" },
  { id: "base", label: "Base Stats" },
  { id: "evolution", label: "Evolution" },
];

const dataAbout = [
  { id: "species", label: "Especies" },
  { id: "height", label: "Height" },
  { id: "weight", label: "Weight" },
  { id: "abilities", label: "Habilities" },
  { id: "bred", label: "Breeding" },
  { id: "egroup", label: "Eggs Group" },
  { id: "ecycle", label: "Eggs Cycle" },
];

const statsData = [
  { id: "hp", label: "HP" },
  { id: "attack", label: "Attack" },
  { id: "defense", label: "Defense" },
  { id: "special-attack", label: "Special Attack" },
  { id: "special-defense", label: "Special Defense" },
  { id: "total", label: "Total" },
];

const levels = ["1", "2", "3"];

export default function PokemonStats( {pokemon}) {
  const [active, setActive] = useState("about");
  const pokeData = {
    height: pokemon.height,
    weight: pokemon.weight,
    habilities: [pokemon.abilities]
  };


  return (
    <div className="w-[400px] h-[500px] shadow-md bg-[#cfcfcf] rounded-xl ms-[100px] mt-[40px]">
      <ul className="flex justify-center space-x-6 relative pb-2 pt-5">
        {optionsTabla.map((tab) => (
          <li
            key={tab.id}
            className="cursor-pointer text-gray-700 font-semibold relative"
            onClick={() => {
              setActive(tab.id);
            }}
          >
            {tab.label}

            {active === tab.id && (
              <span className="absolute left-0 right-0 h-[3px] bg-gray-400 rounded-full bottom-[-6px] transition-all duration-300"></span>
            )}
          </li>
        ))}
      </ul>

      <ul className="ms-2 pt-4 space-y-5">
        {active === "about" &&
          dataAbout.map((data) => (
            <li
              key={data.id}
              className={
                data.label === "Breeding"
                  ? "font-bold text-[#333333] text-[25px] mt-4"
                  : "flex ms-2 space-x-10 justify-between items"
              }
            >
              <span>{data.label}</span>
              {data.label === "Breeding" ? null : (
                <>
                <span className="w-[50px] ms-auto me-5">{data.label === "Height" ? pokeData.height:""}</span>
                <span className="w-[50px] ms-auto me-5">{data.label === "Weight" ? pokeData.weight:""}</span>
                </>
              )}
            </li>
          ))}

        {active === "base" &&
          statsData.map((stat) => (
            <li
              key={stat.id}
              className="flex ms-2 space-x-10 mt-5 justify-between items-center"
            >
              <span className="">{stat.label}</span>
              <span className="pe-[50px] me-3"> 100 </span>
            </li>
          ))}

        {active === "evolution" &&
          levels.map((level) => (
            <li key={level.id} className="w-[150px] mx-auto text-center">
              <span>Bulbasur</span>
              <img src="" alt="pokeimagen" />
            </li>
          ))}
      </ul>
    </div>
  );
}