import { Battle } from "src/battle/battle.entity"
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"

@Entity()
export class Pokemon {
    @PrimaryColumn({ unique: true })
    id: string

    @Column()
    name: string

    @Column()
    attack: number

    @Column()
    defense: number

    @Column()
    hp: number

    @Column()
    speed: number

    @Column()
    type: string

    @Column()
    imageUrl: string

    // Relaciones
    @OneToMany(() => Battle, (battle) => battle.chosenPokemon)
    battlesAsChosen: Battle[];

    @OneToMany(() => Battle, (battle) => battle.rivalPokemon)
    battlesAsRival: Battle[];

    @OneToMany(() => Battle, (battle) => battle.winnerPokemon)
    battlesAsWinner: Battle[];
}