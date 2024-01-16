import s from "./PokemonStyle.module.scss"
import React, { useState, useEffect } from 'react';

const PokemonPage = (props)=>{
    const [infoPakemon, setInfoPakemon] = useState(null);
    const [colorBtn,SetColorBtn] = useState('blue')
    const btn_types={
        width: "35%",
        fontSize: "10px",
        textAlign: "center",
        height: "25px",
        border: "none",
        borderRadius: "5px",
        color: "white",
        backgroundColor: colorBtn,
        marginRight: "5px"
    }
    const typeColorMapping = {
        fire: 'red',
        grass: 'green',
        water: 'blue',
        poison: 'purple',
        flying: 'skyblue',
        bug: 'brown',
        normal: 'grey'
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(props.data.url);
          const data = await response.json();
          setInfoPakemon(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [props.data.url]); 
  
    if (!infoPakemon) {
      return <div>Loading...</div>;
    }
    return (
        
        <div onClick={props.onClick} className={s.container} id={infoPakemon.id}>
            <div className={s.img_container}>
                <img src={infoPakemon.sprites.front_default} alt="" />
            </div>
          <p className={s.Name}>{props.data.name}</p>
          <div className={s.types}>
          {infoPakemon.types.map((types, index) => (
        <button key={index+2332} style={{ ...btn_types, backgroundColor: typeColorMapping[types.type.name] }}>{types.type.name}</button>
        ))}
          </div>
        </div>
    )
}

export default PokemonPage;