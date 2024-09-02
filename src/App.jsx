import { useState, useEffect} from 'react'
import './App.css'
import Card from './Card';

function App() {

  const [pokemon, setPokemon] = useState([]);

  useEffect(()=>{

    const numbers = [];

    async function getPokemon(url){
      return await fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error('Erro:',error));
    }

    for(let i = 0; i < 10; i++){
      let randomNumber = parseInt((Math.random() * 100) + 1);

      numbers.push(randomNumber);
      
    } 

    let promises = numbers.map((el)=>{
      const apiCall = getPokemon(`https://pokeapi.co/api/v2/pokemon/${el}`);

      return apiCall
    });

    Promise.all(promises).then(result => setPokemon(result));

  }, []);

  console.log(pokemon)

  


  return (
    <>
     <div className="main">
        
        <Card></Card>
     </div>
    </>
  )
}

export default App
