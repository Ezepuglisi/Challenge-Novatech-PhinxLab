import { PokemonsService } from './pokemons.service';
import { Controller, Get } from '@nestjs/common';

@Controller('pokemons')
export class PokemonsController {

    constructor(private pokemonsService: PokemonsService){}

    @Get()
    async getPokemons(){
      const result = await this.pokemonsService.getPokemons()
      return result
    }
}
