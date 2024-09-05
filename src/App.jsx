import { useState, useEffect} from 'react'
import './App.css'
import Card from './Card';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [update, setUpdate] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);


  function emptyArray(array){
    while(array.length > 0){
      array.pop();
    }

    return array

  }

  useEffect(()=>{

    if (score > bestScore){
      setBestScore(score);
    }

    const numbers = [];

    async function getPokemon(url){
      return await fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error('Erro:',error));
    }

    for(let i = 0; i < 12; i++){

      let randomNumber = parseInt((Math.random() * 50) + 1);

      while (numbers.includes(randomNumber)) {
        randomNumber = parseInt((Math.random() * 50) + 1);
      }

      numbers.push(randomNumber);
      
    } 

    let promises = numbers.map((el)=>{
      const apiCall = getPokemon(`https://pokeapi.co/api/v2/pokemon/${el}`);

      return apiCall
    });

    Promise.all(promises).then(result => setPokemon(result));


  }, [update]);

  const cards = pokemon.map((el) => <Card key={el.id} imageSource={el.sprites.front_default} name={el.name} id={el.id} action={resetList}> </Card> );
  
  function resetList(id){
    setUpdate(update + 1);
    
    if (clickedPokemon.includes(id)){
      setClickedPokemon(emptyArray(clickedPokemon))
      setScore(0);
      return
      
    } else {
      setClickedPokemon([...clickedPokemon, id])
      setScore(score + 1);
    }
  }


  return (
    <>
     <div className="main">
        
        <h1>Memory Game</h1>

        <p>Pontuação: {score}</p>
        <p>Recorde: {bestScore}</p>

        <div className="cards">
          {cards}
        </div>
        
        
     </div>
    </>
  )
}

export default App
