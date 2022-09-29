// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { fetchPokemon } from '../pokemon'
import { PokemonInfoFallback } from '../pokemon';
import { PokemonDataView } from "../pokemon";
import {PokemonForm} from '../pokemon'

class ErrorBoundary extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { error: null, errorInfo: null}
  // }

  // // Use componentDidCatch() to log error information
  // componentDidCatch(error, errorInfo) {
  //   this.setState({
  //     error: error,
  //     errorInfo: errorInfo
  //   })
  // }
  state = {error: null}
  // // Use static getDerivedStateFromError() to render a fallback UI
  static getDerivedStateFromError(error){
    return {error}
  }

  render() {
    if (this.state.error) {
      return (
        < this.props.FallbackComponent error={this.state.error} />
      );
    }
    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if(!pokemonName) {
      return
    }
    setState({status: 'pending'})

    // // with .then
    // fetchPokemon(pokemonName)
    //   .then(pokemon => setPokemon(pokemon),)
    //   .catch(error => setError(error))

    // with async await
    const loadPokemon = async () => {
      try {
        const pokemon = await fetchPokemon(pokemonName)
        setState({status: 'resolved', pokemon})
      } catch (error) {
        setState({status: 'rejected', error})
      }
    }
    loadPokemon()
  }, [pokemonName]);

  if (status === 'idle') {
    return 'submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function ErrorFallback({error}) {
  return (
    <div>
      <div>
        There was an error: {' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
      <div className="pokemon-info__img-wrapper">
        <img src="https://c.tenor.com/XUP3-zoM_s0AAAAC/pokemon-squirtle.gif" alt="sad pokemon" />
      </div>
    </div>
  )
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
        <ErrorBoundary FallbackComponent={ErrorFallback} key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
