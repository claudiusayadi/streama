import { MigrationInterface, QueryRunner } from "typeorm";

export class Oya1754140603030 implements MigrationInterface {
    name = 'Oya1754140603030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_role" AS ENUM('admin', 'user')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "first_name" character varying(255),
                "last_name" character varying(255),
                "phone" character varying(20),
                "bio" character varying(255),
                "avatar" character varying(255) DEFAULT 'avatar.jpg',
                "role" "public"."user_role" NOT NULL DEFAULT 'user',
                "tmdb_key" character varying(255),
                "trakt_key" character varying(255),
                "last_login_at" TIMESTAMP,
                "preferences" jsonb,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_role"
        `);
    }

}
