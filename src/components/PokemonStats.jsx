import { useState } from 'react';
import React from 'react'

export default function PokemonStats() {


  const [active, setActive] = useState("about");
  const [bred, setBred] = useState("bred");

  const optionsTabla = [
    { id: "about", label: "About" },
    { id: "base", label: "Base Stats" },
    { id: "evolution", label: "Evolution" },
    { id: "moves", label: "Moves" }];

  const dataAbout = [
    { id: "species", label: "Especies" },
    { id: "height", label: "Height" },
    { id: "weight", label: "Weight" },
    { id: "abilities", label: "Habilities" },
    { id: "bred", label: "Breeding" },
    { id: "egroup", label: "Eggs Group" },
    { id: "ecycle", label: "Eggs Cycle" }
  ]

  return (
    <div className="w-[400px] h-[500px] bg-red-200 mt-4 rounded-xl">
      <ul className="flex justify-center space-x-6 relative pb-2 pt-5">
        {optionsTabla.map((tab) => (
          <li
            key={tab.id}
            className="cursor-pointer text-gray-700 font-semibold relative"
            onClick={() => setActive(tab.id)}
          >
            {tab.label}


            {active === tab.id && (
              <span className="absolute left-0 right-0 h-[3px] bg-gray-400 rounded-full bottom-[-6px] transition-all duration-300"></span>
            )}
          </li>
        ))}
      </ul>

      <ul className="ms-2 pt-4 space-y-5">
        {dataAbout.map((data) => (
          <li
            key={data.id}
            className={data.label === "Breeding" ? "font-bold text-red-600 text-[25px] mt-4" : ""}
          >
            {data.label}
          </li>
        ))}
      </ul>

    </div>
  )
}
