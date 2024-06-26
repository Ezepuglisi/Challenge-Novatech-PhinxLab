import { MigrationInterface, QueryRunner } from "typeorm";

export class BattleTable1719408933052 implements MigrationInterface {
    name = 'BattleTable1719408933052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "chosenPokemonId" varchar, "rivalPokemonId" varchar, "winnerPokemonId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "chosenPokemonId" varchar, "rivalPokemonId" varchar, "winnerPokemonId" varchar, CONSTRAINT "FK_102dce6f59ec0a0b0f5e6d60ec1" FOREIGN KEY ("chosenPokemonId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c9ca5360277cff88f1b7b65e64" FOREIGN KEY ("rivalPokemonId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7121d3ffa0747697c119817d73e" FOREIGN KEY ("winnerPokemonId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_battle"("id", "chosenPokemonId", "rivalPokemonId", "winnerPokemonId") SELECT "id", "chosenPokemonId", "rivalPokemonId", "winnerPokemonId" FROM "battle"`);
        await queryRunner.query(`DROP TABLE "battle"`);
        await queryRunner.query(`ALTER TABLE "temporary_battle" RENAME TO "battle"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battle" RENAME TO "temporary_battle"`);
        await queryRunner.query(`CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "chosenPokemonId" varchar, "rivalPokemonId" varchar, "winnerPokemonId" varchar)`);
        await queryRunner.query(`INSERT INTO "battle"("id", "chosenPokemonId", "rivalPokemonId", "winnerPokemonId") SELECT "id", "chosenPokemonId", "rivalPokemonId", "winnerPokemonId" FROM "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "battle"`);
    }

}
