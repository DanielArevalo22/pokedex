
import React from 'react'

export default function PokemonCard() {
  return (
    <div className="w-[250px] h-[125px] rounded bg-cover bg-center bg-[url('/bg-resource-plant.png')]">
      <h1 className="text-white font-bold text-2xl font-sans ms-3 pt-2">Bulbasur</h1>
      <div className="flex">

      <div className="w-[90px] space-y-2 mt-3 ms-2">
        <p className="bg-[#60ecdc] text-white text-center w-[70px] rounded-3xl">Grass</p>
        <p className="bg-[#60ecdc] text-white text-center  rounded-3xl">Poison</p>
      </div>

      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt=""
      className="ms-[50px] h-[80px]" />
      </div>
    </div>
  )
}
