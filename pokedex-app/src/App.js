import './App.css';
import React, { useState, useEffect } from 'react';
import PokemonPage from './Component/Pokemon';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [AdditionalInfo,SetAdditionalInfo] =useState(null)
  const [clickPokemon, SetClickPokemon] = useState('none')
  const [api,setApi] = useState('https://pokeapi.co/api/v2/pokemon')
  const vision ={
    width: "250px",
    height:" 400px",
    border: "1px solid black",
    marginTop: "120px",
    marginRight: "50px",
    display: clickPokemon,
    flexDirection: "column",
    alignItems: "center",
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [api]); 

  if (!pokemonData) {
    return <div>Loading...</div>;
  }
  
  const ShowMore = async (e)=> {
    SetClickPokemon('flex')
    const idELement = e.target.parentElement.parentElement.id;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idELement}/`);
      const data = await response.json();
      SetAdditionalInfo(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log(AdditionalInfo);
const NextPage = async ()=>{
  try {
    const response = await fetch(pokemonData.next);
    const data = await response.json();
    setPokemonData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
  const moves = AdditionalInfo?.moves;
  const skill_moves =moves?.length
  return (
    <div className='mainApp'>

    
      <h1>POKEDEX</h1>
      <div className='group_container'>
    <div className='pokemon_list'>
      {pokemonData.results.map((pokemon, index) => (
      <PokemonPage onClick={ShowMore} key={index} data={pokemon} />
      ))}
    </div>
        <div className='info_pakemon' style={vision}>
        <div className='img_info'>
        <img src={AdditionalInfo?.sprites?.front_default} alt="" />
        </div>
        <h2>{AdditionalInfo?.name}</h2>
        <table>
          <tr>
            <td>Types</td>
            <td>{AdditionalInfo?.types[0]?.type?.name}</td>
          </tr>
          <tr>
            <td>Ability</td>
            <td>{AdditionalInfo?.abilities[0]?.ability?.name}</td>
          </tr>
          <tr>
            <td>Total Moves</td>
            <td>{skill_moves}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{AdditionalInfo?.weight}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{AdditionalInfo?.height}</td>
          </tr>
          <tr>
            <td>Experience</td>
            <td>{AdditionalInfo?.base_experience}</td>
          </tr>
          
        </table>
        </div>
        </div>
        <input type='button'  onClick={NextPage} className='btn_load_more' value='Load More'/>
      
    </div>
  );
};

export default App;
