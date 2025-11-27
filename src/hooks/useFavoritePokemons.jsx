import { useState, useEffect } from "react";


function useFavoritePokemons( {flag, pokemon}){
    const createPokemon =  import.meta.env.VITE_URL_BACK + "pokemon/create";
    const deletePokemon = import.meta.env.VITE_URL_BACK + `pokemon/delete/${pokemon.pokemon}`;
    const findPokemon = import.meta.env.VITE_URL_BACK + `pokemon/find/${pokemon.pokemon}`;
    const activatePokemon = import.meta.env.VITE_URL_BACK + `pokemon/activate/${pokemon.pokemon}`;
    const [hp, setHp] = useState(0);
    const [attack, setAttack] = useState(0);
    const [defense, setDefense] = useState(0);
    const [specialAttack, setSpecialAttack] = useState(0);
    const [specialDefense, setSpecialDefense] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [totalStats, setTotalStats] = useState(0);


    useEffect( () => {
        if (!pokemon.statsTotal) return;

        let hp = 0, attack = 0, defense = 0, specialAttack = 0, specialDefense = 0, speed = 0;

        pokemon.statsTotal.forEach(stat => {
            switch(stat.stat.name) {
            case 'hp': hp = stat.base_stat; break;
            case 'attack': attack = stat.base_stat; break;
            case 'defense': defense = stat.base_stat; break;
            case 'special-attack': specialAttack = stat.base_stat; break;
            case 'special-defense': specialDefense = stat.base_stat; break;
            case 'speed': speed = stat.base_stat; break;
            }
        });

        setHp(hp);
        setAttack(attack);
        setDefense(defense);
        setSpecialAttack(specialAttack);
        setSpecialDefense(specialDefense);
        setSpeed(speed);
        setTotalStats(hp + attack + defense + specialAttack + specialDefense + speed);
    }, [pokemon.statsTotal]);


    const bodyRequest = {
        numeroPokemon: pokemon.numeroPokemon,
        pokemon: pokemon.pokemon,
        tipo: pokemon.tipo,
        status: 'A',
        urlImagen: pokemon.urlImagen,
        attack: attack,
        defense: defense,
        specialAttack: specialAttack,
        specialDefense: specialDefense,
        speed: speed,
        hp: hp,
        total: totalStats
    };


    const api = async () => {
        //VERIFICAR SI EL POKEMON YA EXISTE EN LA DB;
        const existPokemon = await fetch(findPokemon);

        if(existPokemon.ok){
            if(flag){
                //POKEMON EXISTE, ELIMINANDO.........
                const response = await fetch(deletePokemon, {
                    method:"PUT"
                });
                const data = response.json();
                return data;
            }else{
                const response = await fetch(activatePokemon, {
                    method:"PUT"
                });
                return response.json();
            }
        }else{
            console.log('BODY DE POKEMON A MANDAR -----> ', bodyRequest);
            const response = await fetch(createPokemon, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(bodyRequest)
                });
                const data = response.json();
                return data;
        }
    
    }
    return {api};   
}

export default useFavoritePokemons;