-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_topic_id_fkey";

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "topic_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "topic_to_brand" (
    "topic_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "topic_to_brand_topic_id_brand_id_key" ON "topic_to_brand"("topic_id", "brand_id");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_to_brand" ADD CONSTRAINT "topic_to_brand_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_to_brand" ADD CONSTRAINT "topic_to_brand_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
