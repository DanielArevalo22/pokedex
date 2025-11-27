import { useState, useEffect } from "react";

function useFavoritePokemons(flag, pokemon) {
    const BASE_URL = import.meta.env.VITE_URL_BACK;
    const [hp, setHp] = useState(0);
    const [attack, setAttack] = useState(0);
    const [defense, setDefense] = useState(0);
    const [specialAttack, setSpecialAttack] = useState(0);
    const [specialDefense, setSpecialDefense] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [totalStats, setTotalStats] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!pokemon.statsTotal) {
            return;
        }
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

    const api = async () => {
        
        const createPokemon = `${BASE_URL}pokemon/create`;
        const deletePokemon = `${BASE_URL}pokemon/delete/${pokemon.pokemon}`;
        const findPokemon = `${BASE_URL}pokemon/find/${pokemon.pokemon}`;
        const activatePokemon = `${BASE_URL}pokemon/activate/${pokemon.pokemon}`;

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

        try {
            const existPokemon = await fetch(findPokemon, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            
            const existData = await existPokemon.json();
            
            // Si existe (tiene datos)
            if (existData.success) {
                if (flag) {
                    console.log('POKEMON EXISTE - ELIMINANDO');
                    const response = await fetch(deletePokemon, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        }
                    });
                    return await response.json();
                } else {
                    console.log('POKEMON EXISTE - ACTIVANDO');
                    const response = await fetch(activatePokemon, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        }
                    });
                    return await response.json();
                }
            } else {
                // No existe, crear
                console.log('CREANDO POKEMON:', bodyRequest);
                const response = await fetch(createPokemon, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(bodyRequest)
                });
                return await response.json();
            }
        } catch (error) {
            console.error('Error en API:', error);
            throw error;
        }
    };

    return { api };   
}

export default useFavoritePokemons;