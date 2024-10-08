import "./pokeCard.css";
import Lottie from 'react-lottie-player';
import pokeballAnimation from './pokeball.json';  
import{ useState , useEffect} from "react";
import { PokemonCards } from "./PokemonCards";
export const Pokemon = ()=>{
    const [pokemonInfo,setPokemonInfo]=useState([]);
    const [pokeSearch,setPokeSearch]=useState("");
    const[loading,setLoading]=useState(true);
    const [error,setError]=useState("");
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
    className="loading-container"
    loop
    animationData={pokeballAnimation}
    play
    style={{
        display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",    
        width: "100vw",              
        backgroundColor: "white",
        }}
/>
    if(error) return<h1>{error}</h1>
    const searchContain = pokemonInfo.filter((currentPokemon)=>currentPokemon.name.toLowerCase().includes(pokeSearch.toLowerCase()))
    return<div className="pokemon-app">
    <header className="app-header">
    <h1>Pokemon Cards</h1>
    <input placeholder="search pokemon" value={pokeSearch} onChange={(evt)=>setPokeSearch(evt.target.value)} className="search-bar" />
    </header>
    <section >
        <ul className="pokemon-grid">
           { 
           searchContain.map((pokeName)=>{
            return <PokemonCards key={pokeName.id} pokeName={pokeName} />
            })}
        </ul>
       </section>
    </div>
}
