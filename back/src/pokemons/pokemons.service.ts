import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './pokemons.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonsService {

    constructor(@InjectRepository(Pokemon) private pokemonRepository:Repository <Pokemon>){}

    async getPokemons(){
        return this.pokemonRepository.find()
    }
}


