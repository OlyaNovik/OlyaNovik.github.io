import './App.css';
import React, { useState, useEffect } from 'react';
import PokemonPage from './Component/Pokemon';

function App() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  if (!pokemonData) {
    return <div>Loading...</div>;
  }
  return (
    <div className='mainApp'>

    
      <h1>Pokemon List</h1>
    <div className='pokemon_list'>
      {pokemonData.results.map((pokemon, index) => (
      <PokemonPage data={pokemon} />
      ))}
    </div>
    </div>
  );
};

export default App;
