/* eslint-disable react/prop-types */
export const PokemonCards = ({pokeName})=>{
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
    return (
        <li className="card">
                <figure className="card-image" style={{
                        backgroundColor:typeColor[pokeName.types[0].type.name]
                    }}>
                    <img
                    src={pokeName.sprites.other.dream_world.front_default}
                    alt={pokeName.name}
                    />
                </figure>
                <div className="card-content">
                <h2>{pokeName.name.charAt(0).toUpperCase()+pokeName.name.slice(1)}</h2>    
                <div className="types">
                 {pokeName.types.map((currType,index) => (
                            <span key={index} className="type" style={{
                                backgroundColor:typeColor[pokeName.types[index].type.name]
                            }}>
                            {currType.type.name}
                                </span>
             ))}
             </div>
                <p>Abilities : <strong>{pokeName.abilities.map((currAbility)=>currAbility.ability.name).join(" , ")}</strong></p>
                <p>Height : <strong>{pokeName.height}</strong> Weight : <strong>{pokeName.weight}</strong> Speed : <strong>{pokeName.stats[5].base_stat}</strong></p>
                <p>Experience : <strong>{pokeName.base_experience}</strong> Move : <strong>{pokeName.moves[Math.floor(Math.random()*pokeName.moves.length)].move.name}</strong></p>
                <div className="stats">
               <h3>Stats:</h3>
  {pokeName.stats.map((currentPokemon, index) => (
    <div key={index} className="stat-item">
      <span><b>{currentPokemon.stat.name}:</b></span>
      <span><b>{currentPokemon.base_stat}</b></span>
    </div>
  ))}
</div>
</div>
            </li>
    )
}