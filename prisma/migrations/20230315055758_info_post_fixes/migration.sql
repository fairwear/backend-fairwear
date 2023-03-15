-- AlterTable
ALTER TABLE "info_post" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "info_post_to_topic" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;
