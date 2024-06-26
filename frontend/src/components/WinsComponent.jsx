import { Box, Typography } from '@mui/material'
import React from 'react'

const WinsComponent = ({ pokemon }) => {
    return (
        <Box
            padding={1}
            border={0.5}
            borderRadius={2}
            bgcolor={'aliceblue'}
            boxShadow={3}
            marginY={3}
        >
            <Typography variant='p'>{pokemon.name} wins!</Typography>
        </Box>
    )
}

export default WinsComponent