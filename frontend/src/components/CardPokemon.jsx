import { Box, Divider, LinearProgress, Typography } from '@mui/material'
import React from 'react'

const CardPokemon = ({pokemon}) => {

    return (
        <Box display={'flex'} flexDirection={'column'} maxWidth={250} width={'100%'} padding={2} boxShadow={4}>

            <img style={{ margin: 'auto' }} src={pokemon?.imageUrl} height={'150'} />
            <Typography variant='h5'>{pokemon?.name}</Typography>
            <Divider />

            <Typography>HP</Typography>
            <LinearProgress color='success' width={'100%'} variant='determinate' value={pokemon?.hp * 10} />

            <Typography>Attack</Typography>
            <LinearProgress color='success' width={'100%'} variant='determinate' value={pokemon?.attack * 10} />

            <Typography>Defense</Typography>
            <LinearProgress color='success' width={'100%'} variant='determinate' value={pokemon?.defense * 10} />

            <Typography>Speed</Typography>
            <LinearProgress color='success' width={'100%'} variant='determinate' value={pokemon?.speed * 10} />

        </Box>
    )
}

export default CardPokemon