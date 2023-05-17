-- CreateEnum
CREATE TYPE "report_result_enum" AS ENUM ('DELETED', 'EDITED', 'DISREGARDED');

-- AlterTable
ALTER TABLE "report" ADD COLUMN     "report_result" "report_result_enum";
