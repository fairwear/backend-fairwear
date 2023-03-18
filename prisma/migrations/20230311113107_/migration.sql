/*
  Warnings:

  - You are about to drop the column `brand_id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `report` table. All the data in the column will be lost.
  - You are about to drop the `item_to_topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "item_to_topic" DROP CONSTRAINT "item_to_topic_item_id_fkey";

-- DropForeignKey
ALTER TABLE "item_to_topic" DROP CONSTRAINT "item_to_topic_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_item_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_item" DROP CONSTRAINT "user_to_item_item_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_item" DROP CONSTRAINT "user_to_item_user_id_fkey";

-- DropIndex
DROP INDEX "report_item_id_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "brand_id";

-- AlterTable
ALTER TABLE "report" DROP COLUMN "item_id";

-- DropTable
DROP TABLE "item_to_topic";

-- DropTable
DROP TABLE "user_to_item";
