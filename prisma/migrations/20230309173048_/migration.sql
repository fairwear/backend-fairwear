/*
  Warnings:

  - You are about to drop the `Subtopic` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[topic_id]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `topic_id` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subtopic" DROP CONSTRAINT "Subtopic_topic_id_fkey";

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "topic_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Subtopic";

-- CreateIndex
CREATE UNIQUE INDEX "Topic_topic_id_key" ON "Topic"("topic_id");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
