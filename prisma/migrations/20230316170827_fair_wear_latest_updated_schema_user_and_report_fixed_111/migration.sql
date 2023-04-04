/*
  Warnings:

  - The `status` column on the `report` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `report_to_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status_to_report` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "report_status_enum" AS ENUM ('SUBMITTED', 'PENDING', 'RESOLVED');

-- DropForeignKey
ALTER TABLE "status_to_report" DROP CONSTRAINT "status_to_report_status_id_fkey";

-- AlterTable
ALTER TABLE "report" DROP COLUMN "status",
ADD COLUMN     "status" "report_status_enum" NOT NULL DEFAULT 'SUBMITTED';

-- DropTable
DROP TABLE "report_to_status";

-- DropTable
DROP TABLE "status_to_report";

-- DropEnum
DROP TYPE "status_enum";
