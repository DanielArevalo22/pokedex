function FilterOptions() {
  return <>
  <div className="flex space-x-5 mt-2 ms-5 mb-5">
    <HabitadFilter ></HabitadFilter>
    <TypeFilter></TypeFilter>
    <ColorFilter></ColorFilter>
  </div>
  </>;
}

function TypeFilter() {
  return (
    <>
      <div className="flex">
        <p className="text-xl cursor-default">Type: </p>
        <select name=""id=""
          className="border-solid border-2 w-[140px] h-[25px] mt-1 ml-2 rounded-xl text-center cursor-pointer hover:shadow transition duration-500"
        >
          <option value="all">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
        </select>
      </div>
    </>
  );
}

function HabitadFilter() {
    return (
        <>
            <div className="flex">
                 <p className="text-xl">Habitat: </p>
                 <select name="" id="" className="border-solid border-2 w-[140px] h-[25px] mt-1 ml-2 rounded-xl text-center cursor-pointer hover:shadow  transition duration-500">
                    <option value="all">All</option>
                    <option value="forest">Forest</option>
                 </select>
            </div>
        </>
    );
}

function ColorFilter() {
    return (
        <>
            <div className="flex">
                 <p className="text-xl">Color: </p>
                 <select name="" id="" className="border-solid border-2 w-[140px] h-[25px] mt-1 ml-2 rounded-xl text-center cursor-pointer hover:shadow transition duration-500">
                    <option value="all">All</option>
                    <option value="forest">Red</option>
                 </select>
            </div>
        </>
    );
}

export default FilterOptions;
