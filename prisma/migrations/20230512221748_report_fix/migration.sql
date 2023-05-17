/*
  Warnings:

  - A unique constraint covering the columns `[post_id,author_id]` on the table `report` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "report_author_id_key";

-- DropIndex
DROP INDEX "report_post_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "report_post_id_author_id_key" ON "report"("post_id", "author_id");
