import "./pokeCard.css";
import Lottie from 'react-lottie-player';
import pokeballAnimation from './pokeball.json';  
import{ useState , useEffect} from "react";
// import { PokemonCards } from "./PokemonCards";
export const Pokemon = ()=>{
    const [pokemonInfo,setPokemonInfo]=useState([]);
    const [pokeSearch,setPokeSearch]=useState("");
    const[loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    const typeColor ={
        "normal": "#AAAA99",
        "fire": "#FF4422",
        "water": "#3399FF",
        "electric": "#FFCC33",
        "grass": "#77CC55",
        "ice": "#66CCFF",
        "fighting": "#BB5544",
        "poison": "#AA5599",
        "ground": "#DDBB55",
        "flying": "#8899FF",
        "psychic": "#FF5599",
        "bug": "#AABB22",
        "rock": "#BBAA66",
        "ghost": "#6666BB",
        "dragon": "#7766EE",
        "dark": "#775544",
        "steel": "#AAAABB",
        "fairy": "#EE99EE"
      }
    const api= async ()=>{
        try{
        const fetchedData = await(await fetch("https://pokeapi.co/api/v2/pokemon?limit=649")).json();
       const info =  fetchedData.results.map(async (poke)=>{
            const pokeInfo = await(await fetch(poke.url)).json();
            return pokeInfo ;
        } 
    )
    const detailedInfo = await Promise.all(info);
    setLoading(false);
    setPokemonInfo(detailedInfo);
        }
        catch(error){
            setError(`Found this error : ${error}`)
        }
    }
    useEffect(()=>{
        api();
    },[])
    if(loading)
    return  <Lottie
    loop
    animationData={pokeballAnimation}
    play
    style={{display: 'flex',             
        justifyContent: 'center',     
        alignItems: 'center',         
        height: '90vh',              
        width: '90vw',              
        backgroundColor: 'white',
        }}
/>
    if(error) return<h1>{error}</h1>
    const searchContain = pokemonInfo.filter((currentPokemon)=>currentPokemon.name.toLowerCase().includes(pokeSearch.toLowerCase()))
    return<>
    <header>
    <h1>Pokemon Cards</h1>
    <input placeholder="search pokemon" value={pokeSearch} onChange={(evt)=>setPokeSearch(evt.target.value)} className="search-bar" />
    </header>
    <section >
        <ul className="Cards">
           { 
           searchContain.map((pokeName)=>{
            return (
                <li key={pokeName.id} className="Card">
                <figure>
                    <img
                    src={pokeName.sprites.other.dream_world.front_default}
                    alt={pokeName.name}
                    style={{
                        backgroundColor:typeColor[pokeName.types[0].type.name]
                    }}
                    >
                    </img>
                </figure>
                <div className="contains">
                <h1>{pokeName.name.charAt(0).toUpperCase()+pokeName.name.slice(1)}</h1>    
                <p className="types">{pokeName.types.map((currType,index) => (
                            <span key={index} className="type" style={{
                                backgroundColor:typeColor[pokeName.types[index].type.name]
                            }}>
                            {currType.type.name}
                                            <br />
                                </span>
             ))}</p>
                <p>Abilities : <b>{pokeName.abilities.map((currAbility)=>currAbility.ability.name).join(" , ")}</b></p>
                <p>Height : <b>{pokeName.height}</b> Weight : <b>{pokeName.weight}</b> Speed : <b>{pokeName.stats[5].base_stat}</b></p>
                <p>Experience : <b>{pokeName.base_experience}</b> Move : <b>{pokeName.moves[Math.floor(Math.random()*pokeName.moves.length)].move.name}</b></p>
                <div className="stats-container">
  <p className="stats-label">Stats:</p>
  {pokeName.stats.map((currentPokemon, index) => (
    <div key={index} className="stats-item">
      <span><b>{currentPokemon.stat.name}</b></span>
      <span className="colon">:</span>
      <span><b>{currentPokemon.base_stat}</b></span>
    </div>
  ))}
</div>
</div>
            </li>
            )
            })}
        </ul>
       </section>
    </>
}
