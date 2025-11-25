function FilterOptions({ onFilter }) {

  const handleTypeChange = (e) => {
  const value = e.target.value;
  if (value === "all") {
    onFilter("https://pokeapi.co/api/v2/pokemon?limit=50");
  } else {
    onFilter(`https://pokeapi.co/api/v2/type/${value}`);
  }
};

const handleHabitatChange = (e) => {
  const value = e.target.value;
  if (value === "all") {
    onFilter("https://pokeapi.co/api/v2/pokemon?limit=50");
  } else {
    onFilter(`https://pokeapi.co/api/v2/pokemon-habitat/${value}`);
  }
};

const handleColorChange = (e) => {
  const value = e.target.value;
  if (value === "all") {
    onFilter("https://pokeapi.co/api/v2/pokemon?limit=50");
  } else {
    onFilter(`https://pokeapi.co/api/v2/pokemon-color/${value}`);
  }
};


  return (
    <div className="flex space-x-5 mt-2 ms-5 mb-5">
      <div className="flex">
        <p className="text-xl cursor-default">Type: </p>
        <select
          onChange={handleTypeChange}
          className="border-solid border-2 w-[140px] h-[25px] mt-1 ml-2 rounded-xl text-center cursor-pointer hover:shadow transition duration-500"
        >
          <option value="all">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
        </select>
      </div>


      <div className="flex">
        <p className="text-xl">Habitat: </p>
        <select
          onChange={handleHabitatChange}
          className="border-solid border-2 w-[140px] h-[25px] mt-1 ml-2 rounded-xl text-center cursor-pointer hover:shadow transition duration-500"
        >
          <option value="all">All</option>
          <option value="forest">Forest</option>
          <option value="cave">Cave</option>
          <option value="rare">Rare</option>
        </select>
      </div>


      <div className="flex">
        <p className="text-xl">Color: </p>
        <select
          onChange={handleColorChange}
          className="border-solid border-2 w-[140px] h-[25px] mt-1 ml-2 rounded-xl text-center cursor-pointer hover:shadow transition duration-500"
        >
          <option value="all">All</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </select>
      </div>
    </div>
  );
}

export default FilterOptions;
