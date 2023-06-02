-- AlterTable
ALTER TABLE "topic_to_brand"
	ADD COLUMN "score" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "topic_to_brand"
	ADD CONSTRAINT "score_range_check" CHECK ("score" BETWEEN 0 AND 10);

