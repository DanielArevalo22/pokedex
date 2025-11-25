import { useState, useEffect } from "react";

const optionsTabla = [
  { id: "about", label: "About" },
  { id: "base", label: "Base Stats" },
  { id: "evolution", label: "Evolution" },
];

export default function PokemonStats({ pokemon }) {
  const [active, setActive] = useState("about");
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        
        //PAROA LA DATA BASICA DEL POKEMON
        const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const pokeJson = await pokeRes.json();
        setStats(pokeJson.stats);

        // DATO DE LA ESPACIE 
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);
        const speciesJson = await speciesRes.json();
        setSpeciesData(speciesJson);

        // DATA DEL A EVOLUCION
        const evoRes = await fetch(speciesJson.evolution_chain.url);
        const evoJson = await evoRes.json();

        const evoList = [];
        function traverse(chain) {
          evoList.push(chain.species.name);
          chain.evolves_to.forEach(traverse);
        }
        traverse(evoJson.chain);

        const evoWithSprites = await Promise.all(
          evoList.map(async (name) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const json = await res.json();
            return { name, sprite: json.sprites.front_default };
          })
        );
        setEvolutionChain(evoWithSprites);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [pokemon.name]);

  const totalStats = stats.reduce((acc, s) => acc + s.base_stat, 0);

  return (
    <div className="w-[400px] h-[490px] shadow-lg bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl ms-[100px] mt-[20px] border border-gray-200">
      <ul className="flex justify-center space-x-8 relative pb-3 pt-2">
        {optionsTabla.map((tab) => (
          <li
            key={tab.id}
            className={`cursor-pointer font-semibold relative transition-colors duration-300 ${
              active === tab.id ? "text-indigo-600" : "text-gray-600 hover:text-indigo-400"
            }`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute left-0 right-0 h-[3px] bg-indigo-500 rounded-full bottom-[-6px] transition-all duration-300"></span>
            )}
          </li>
        ))}
      </ul>

      <ul className="px-6 pt-4 space-y-4 overflow-y-auto max-h-[330px]">
        {active === "about" && speciesData && (
          <>
            <li className="grid grid-cols-2 gap-4 items-center text-gray-700">
              <span className="font-medium">Species</span>
              <span className="bg-white rounded-md px-2 py-1 shadow-sm">
                {speciesData.genera[0]?.genus}
              </span>
            </li>
            <li className="grid grid-cols-2 gap-4 items-center text-gray-700">
              <span className="font-medium">Height</span>
              <span className="bg-white rounded-md px-2 py-1 shadow-sm">{pokemon.height}</span>
            </li>
            <li className="grid grid-cols-2 gap-4 items-center text-gray-700">
              <span className="font-medium">Weight</span>
              <span className="bg-white rounded-md px-2 py-1 shadow-sm">{pokemon.weight}</span>
            </li>
            <li className="grid grid-cols-2 gap-4 items-center text-gray-700">
              <span className="font-medium">Abilities</span>
              <span className="bg-white rounded-md px-2 py-1 shadow-sm">
                {pokemon.abilities.map((a) => a.ability.name).join(", ")}
              </span>
            </li>
            <li className="grid grid-cols-2 gap-4 items-center text-gray-700">
              <span className="font-medium">Egg Groups</span>
              <span className="bg-white rounded-md px-2 py-1 shadow-sm">
                {speciesData.egg_groups.map((e) => e.name).join(", ")}
              </span>
            </li>
            <li className="grid grid-cols-2 gap-4 items-center text-gray-700">
              <span className="font-medium">Egg Cycle</span>
              <span className="bg-white rounded-md px-2 py-1 shadow-sm">
                {speciesData.hatch_counter}
              </span>
            </li>
          </>
        )}

        {active === "base" &&
          stats.map((s) => (
            <li key={s.stat.name} className="grid grid-cols-2 gap-4 items-center text-gray-700">
              <span className="font-medium capitalize">{s.stat.name}</span>
              <span className="text-center bg-indigo-50 text-indigo-600 font-semibold rounded-md px-3 py-1 shadow-sm">
                {s.base_stat}
              </span>
            </li>
          ))}
        {active === "base" && (
          <li className="grid grid-cols-2 gap-4 items-center text-gray-700 h-[100%]">
            <span className="font-medium">Total</span>
            <span className="text-center bg-indigo-50 text-indigo-600 font-semibold rounded-md px-3 py-1 shadow-sm">
              {totalStats}
            </span>
          </li>
        )}

        {active === "evolution" &&
          evolutionChain.map((evo) => (
            <li
              key={evo.name}
              className="w-full flex items-center justify-between bg-white rounded-lg shadow-md px-4 py-2 hover:scale-[1.02] transition-transform duration-300"
            >
              <span className="font-semibold text-gray-700 capitalize">{evo.name}</span>
              <img src={evo.sprite} alt={evo.name} className="w-[60px] h-[60px]" />
            </li>
          ))}
      </ul>
    </div>
  );
}
