import { DataSource, DataSourceOptions } from 'typeorm';
import { Pokemon } from './src/pokemons/pokemons.entity';
import { Battle } from 'src/battle/battle.entity';

const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'db/pokemondb.sqlite',
  entities: [Pokemon, Battle],
  migrations: ['dist/migrations/*.ts'],
  synchronize: false,
};

export const dataSource = new DataSource(ormConfig)
export default ormConfig;

