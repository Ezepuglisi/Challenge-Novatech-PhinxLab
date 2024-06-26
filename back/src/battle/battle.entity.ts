import { Pokemon } from "src/pokemons/pokemons.entity";
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.battlesAsChosen)
  chosenPokemon: Pokemon;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.battlesAsRival)
  rivalPokemon: Pokemon;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.battlesAsWinner)
  winnerPokemon: Pokemon;
}