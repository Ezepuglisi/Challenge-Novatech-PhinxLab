export const startBattle = async (chosenPokemon, rivalPokemon) => {
    const url = 'http://localhost:3000/battle';

    const requestBody = {
        chosenPokemonId: chosenPokemon.id,
        rivalPokemonId: rivalPokemon.id
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData.winnerPokemon

    } catch (error) {
        console.error('Error en la solicitud:', error);

    }
};