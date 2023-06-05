/*
  Warnings:

  - The values [DISREGARDED] on the enum `report_result_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "report_result_enum_new" AS ENUM ('DELETED', 'EDITED', 'NO_ACTION', 'REOPENED');
ALTER TABLE "report" ALTER COLUMN "report_result" TYPE "report_result_enum_new" USING ("report_result"::text::"report_result_enum_new");
ALTER TYPE "report_result_enum" RENAME TO "report_result_enum_old";
ALTER TYPE "report_result_enum_new" RENAME TO "report_result_enum";
DROP TYPE "report_result_enum_old";
COMMIT;
