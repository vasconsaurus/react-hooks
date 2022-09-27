// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { fetchPokemon } from '../pokemon'
import { PokemonInfoFallback } from '../pokemon';
import { PokemonDataView } from "../pokemon";
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  let [pokemon, setPokemon] = React.useState(null)

    React.useEffect(() => {
      if(!pokemonName) {
        return
      }
      setPokemon(null)
      fetchPokemon(pokemonName).then(
        pokemonData => { setPokemon(pokemonData) },
      )
    }, [pokemonName]);

  if (!pokemonName) {
    return 'submit a pokemon'
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemon} />
  }

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
