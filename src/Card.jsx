import './App.css'

function Card ({imageSource, name, id, action}){

    return (
        <button className="card" onClick={() => action(id)}>
            <img src={imageSource}/>
            <p>{name}</p>
        </button>
    )
}

export default Card;