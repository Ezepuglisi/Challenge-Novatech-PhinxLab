import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './battle.entity';
import { Pokemon } from '../pokemons/pokemons.entity';
import { CreateBattleDto } from './dto/create-battle.dto';

@Injectable()
export class BattlesService {
    constructor(
        @InjectRepository(Battle)
        private readonly battleRepository: Repository<Battle>,
        @InjectRepository(Pokemon)
        private readonly pokemonRepository: Repository<Pokemon>,
    ) { }


    private battleRun(chosenPokemon: Pokemon, rivalPokemon: Pokemon): Pokemon {
        while (true) {
            if (chosenPokemon.speed > rivalPokemon.speed) {
                const damageFromChosen = chosenPokemon.attack > rivalPokemon.defense ? chosenPokemon.attack - rivalPokemon.defense : 1;
                rivalPokemon.hp -= damageFromChosen;
    
                if (rivalPokemon.hp <= 0) {
                    return chosenPokemon;
                }
    
                const damageFromRival = rivalPokemon.attack > chosenPokemon.defense ? rivalPokemon.attack - chosenPokemon.defense : 1;
                chosenPokemon.hp -= damageFromRival;
    
                if (chosenPokemon.hp <= 0) {
                    return rivalPokemon;
                }
            } else {
                const damageFromRival = rivalPokemon.attack > chosenPokemon.defense ? rivalPokemon.attack - chosenPokemon.defense : 1;
                chosenPokemon.hp -= damageFromRival;
    
                if (chosenPokemon.hp <= 0) {
                    return rivalPokemon;
                }
    
                const damageFromChosen = chosenPokemon.attack > rivalPokemon.defense ? chosenPokemon.attack - rivalPokemon.defense : 1;
                rivalPokemon.hp -= damageFromChosen;
    
                if (rivalPokemon.hp <= 0) {
                    return chosenPokemon;
                }
            }
        }
    }

    async create(createBattleDto: CreateBattleDto) {

        const { chosenPokemonId, rivalPokemonId } = createBattleDto;

        if (!chosenPokemonId || !rivalPokemonId) {
            throw new Error('One or both of the specified Pokémon do not exist');
        }

        const chosenPokemon = await this.pokemonRepository.findOneBy({ id: chosenPokemonId });
        const rivalPokemon = await this.pokemonRepository.findOneBy({ id: rivalPokemonId });

        if (!chosenPokemon || !rivalPokemon) {
            throw new Error('One or both of the specified Pokémon do not exist');
        }

        const winner = this.battleRun(chosenPokemon, rivalPokemon)

        const battle = this.battleRepository.create({
            chosenPokemon:chosenPokemon,
            rivalPokemon:rivalPokemon,
            winnerPokemon:winner
        })

        return this.battleRepository.save(battle);
    }
}