// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { fetchPokemon } from '../pokemon'
import { PokemonInfoFallback } from '../pokemon';
import { PokemonDataView } from "../pokemon";
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  let [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if(!pokemonName) {
      return
    }
    setPokemon(null)

    // // with .then
    // fetchPokemon(pokemonName).then(
    //   pokemonData => { setPokemon(pokemonData) },
    // )

    // with async await
    const loadPokemon = async () => {
      try {const pokemonData = await fetchPokemon(pokemonName)
      setPokemon(pokemonData)
      } catch (error) {
        setError(error)
      }
    }
    loadPokemon()
  }, [pokemonName]);

  if (error) {
    return (
      <div>
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
          <div className="pokemon-info__img-wrapper">
          <img src="https://c.tenor.com/XUP3-zoM_s0AAAAC/pokemon-squirtle.gif" alt="sad pokemon" />
        </div>
      </div>
    )
  }

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
