import { useState } from "react";
import { Link } from "react-router-dom";

function MainPage() {

  const [name, setName] = useState("");


  return (
    <>
      <div className="w-[100%]">
        <div className="bg-[#e74302] rounded-b-xl py-[40px] flex items-center space-x-5 justify-center">
          <img
            src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/vector-icons-7/pokeball-xeg9gc4xzwluseur3c3mm.png/pokeball-qdt0o2i0d34nyhk4opt88.png?_a=DATAg1AAZAA0"
            alt=""
            className="w-[100px] h-[100px]"
          />
          <h1 className="text-[70px] font-bold text-white">Pokedex</h1>
        </div>

        <div className="mx-auto w-[500px] mt-4">
          <input
            type="text"
            className="border-solid border-2 rounded-xl w-[400px] h-[50px] text-2xl font-semibold text-center"
            name="pokemonSearch"
            placeholder="Busca un pokemon por nombre!"
            onChange={(e) => {setName(e.target.value.toLowerCase()); console.log(name) }}
          />
          <Link to={`/pokemon/info/${name}`}
            href="#" className="inline-block h-[50px] text-[#f7f200] ms-1 w-[50px] rounded-xl bg-[#0b9df1] hover:bg-[#077ec4] hover:text-white transition duration-300"
          >
            <i className="fa-solid fa-magnifying-glass text-4xl pt-1 ps-1"></i>
          </Link>
        </div>
        <div className="mx-auto w-[300px] mt-2">
          <Link className="inline-block bg-[#0b9df1] w-[300px] h-[50px] text-xl text-center pt-2.5 rounded-xl text-white font-semibold
                        hover:bg-[#077ec4] hover:text-[#f7f200] hover:font-bold transition duration-500" 
                to="/login">
            Pokedex completa
          </Link>
        </div>
      </div>
    </>
  );
}

export default MainPage;
