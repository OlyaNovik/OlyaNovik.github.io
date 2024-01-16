import s from "./PokemonStyle.module.scss"

const PokemonPage = (props)=>{
    console.log(props.data);
    return (
        <div className={s.container}>
            <div className={s.img_container}>
                <img src="" alt="" />
            </div>
          <h2>{props.data.name}</h2>
        </div>
    )
}

export default PokemonPage;