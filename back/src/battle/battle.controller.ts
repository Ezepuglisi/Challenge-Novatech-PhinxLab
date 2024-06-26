// import { PokemonsService } from './pokemons.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { BattlesService } from './battle.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './battle.entity';

@Controller('battle')
export class BattleController {

    constructor(private readonly battlesService: BattlesService) {}

    @Post()
    create(@Body() createBattleDto: CreateBattleDto) {

      return this.battlesService.create(createBattleDto);
    }
}