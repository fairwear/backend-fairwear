-- DropForeignKey
ALTER TABLE "status_to_report" DROP CONSTRAINT "status_to_report_report_id_fkey";

-- AlterTable
ALTER TABLE "report" ADD COLUMN     "status" "status_enum" NOT NULL DEFAULT 'SUBMITTED';
