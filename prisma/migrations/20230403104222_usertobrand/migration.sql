/*
  Warnings:

  - You are about to drop the column `item_id` on the `report` table. All the data in the column will be lost.
  - You are about to drop the `item_to_topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `topic_to_brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item_to_topic" DROP CONSTRAINT "item_to_topic_item_id_fkey";

-- DropForeignKey
ALTER TABLE "item_to_topic" DROP CONSTRAINT "item_to_topic_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_item_id_fkey";

-- DropForeignKey
ALTER TABLE "topic_to_brand" DROP CONSTRAINT "topic_to_brand_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "topic_to_brand" DROP CONSTRAINT "topic_to_brand_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_item" DROP CONSTRAINT "user_to_item_item_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_item" DROP CONSTRAINT "user_to_item_user_id_fkey";

-- DropIndex
DROP INDEX "report_item_id_key";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "report" DROP COLUMN "item_id";

-- DropTable
DROP TABLE "item_to_topic";

-- DropTable
DROP TABLE "topic_to_brand";

-- DropTable
DROP TABLE "user_to_item";

-- CreateTable
CREATE TABLE "user_to_brand" (
    "user_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "list_name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_to_brand_list_name_key" ON "user_to_brand"("list_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_brand_user_id_brand_id_key" ON "user_to_brand"("user_id", "brand_id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_brand" ADD CONSTRAINT "user_to_brand_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_brand" ADD CONSTRAINT "user_to_brand_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
