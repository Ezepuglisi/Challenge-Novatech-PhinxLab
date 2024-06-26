import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import AppDataSource from 'dataSource.config';
import { BattleModule } from './battle/battle.module';

@Module({
  imports: [
    PokemonsModule,
    TypeOrmModule.forRoot(AppDataSource),
    BattleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {


}
