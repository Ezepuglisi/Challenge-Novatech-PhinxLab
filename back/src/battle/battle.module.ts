import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleController } from './battle.controller';
import { BattlesService } from './battle.service';
import { Battle } from './battle.entity';
import { PokemonsModule } from 'src/pokemons/pokemons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Battle]), PokemonsModule],
  providers: [BattlesService],
  controllers: [BattleController],
})
export class BattleModule {}