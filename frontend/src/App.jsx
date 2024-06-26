import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Box,  CircularProgress, Container, Typography } from '@mui/material';
import axios from 'axios';
import WinsComponent from './components/WinsComponent';
import CardPokemon from './components/CardPokemon';
import { startBattle } from './actions/startBattle';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

function App() {
  const [pokemons, setPokemons] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  //POKEMONS
  const [pokemonSelected, setPokemonSelected] = useState()
  const [pokemonRival, setPokemonRival] = useState()
  const [pokemonWinner, setPokemonWinner] = useState()

  const [searchingRival, setSearchingRival] = useState(false)
  const [loadingBattle, setLoadingBattle] = useState(false)
  const [battleFinished, setBattleFinished] = useState(false)
  const [errorBattle, setErrorBattle] = useState(false)

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));


  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pokemons');
        setPokemons(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError(error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);


  


  const selectPokemon = (id) => {
    const pokemon = pokemons.find((p) => p.id == id)

    setPokemonWinner()
    setBattleFinished(false)
    setPokemonSelected(pokemon)
    setErrorBattle(false)
    setSearchingRival(true)
    randomPokemon(pokemon.id)
  }

  const randomPokemon = (idSelected) => {
    let randomNumber;

    // Generar un número entero aleatorio entre 0 y la longitud del array - 1
    do {
      randomNumber = Math.floor(Math.random() * pokemons.length);
    } while (pokemons[randomNumber].id === idSelected);

    const randomPokemon = pokemons[randomNumber];

    setTimeout(() => {
      setPokemonRival(randomPokemon);
      setSearchingRival(false);
    }, 2000);
  }

  const handleStartBattle = async () => {
    setLoadingBattle(true)
    setBattleFinished(false)
    setError(false)
    const winnerPokemon = await startBattle(pokemonSelected, pokemonRival)

    if(winnerPokemon.id){
      setPokemonWinner(winnerPokemon)
      setLoadingBattle(false)
      setBattleFinished(true)
    }else{
      setErrorBattle(true)
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  // useEffect(() => {
  //   console.log('sm', sm)
  //   console.log(md, 'md')
  // }, [md, sm])


  return (
    <Container maxWidth="lg">

      <Typography variant='h3'>Battle of Pokemon</Typography>
      <Typography variant='h5'>Select your pokemon</Typography>
      <Box
        display='flex'
        gap={1}
        marginY={5}
        flexWrap="wrap"
        justifyContent={'center'}
      >

        {pokemons?.map((pokemon) => {
          return (
            <Box
              paddingX={1}
              boxShadow={3}
              borderRadius={3}
              display={'flex'}
              flexDirection={'column'}
              gap={2}
              style={{ cursor: 'pointer' }}
              onClick={() => selectPokemon(pokemon.id)}
              key={pokemon.id}
            >
              <img src={pokemon.imageUrl} height={'150'} />
              <Typography>{pokemon.name}</Typography>
            </Box>)
        })}


      </Box>

      {battleFinished && 
      <WinsComponent pokemon={pokemonWinner} />
      }

      <Box
        display={'flex'}
        alignContent={'center'}
        justifyContent={'center'}
      >

        {
        loadingBattle ?
        <CircularProgress />
        :
        pokemonSelected  ?
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-around'}
            gap={4}
            width={'100%'}
            flexWrap={'wrap'}

          >
            <CardPokemon pokemon={pokemonSelected} />
            <Button onClick={() => handleStartBattle()} variant="contained" color="success">Start Battle</Button>
            {
              searchingRival ? 
              <CircularProgress color='success' />
              :
              <CardPokemon pokemon={pokemonRival} />
            }
          </Box>
          :
          <Box boxShadow={3} borderRadius={2} padding={3}>
            <Typography>Select one pokemon for start a battle</Typography>
          </Box>
        }
      </Box>

    </Container>
  )
}

export default App
