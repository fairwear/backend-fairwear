/*
  Warnings:

  - You are about to drop the `brand_post_reference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_topic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "brand_post_reference" DROP CONSTRAINT "brand_post_reference_post_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_brand" DROP CONSTRAINT "user_to_brand_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_brand" DROP CONSTRAINT "user_to_brand_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_topic" DROP CONSTRAINT "user_to_topic_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_topic" DROP CONSTRAINT "user_to_topic_user_id_fkey";

-- AlterTable
ALTER TABLE "brand_post" ADD COLUMN     "source_urls" TEXT[];

-- DropTable
DROP TABLE "brand_post_reference";

-- DropTable
DROP TABLE "user_to_brand";

-- DropTable
DROP TABLE "user_to_topic";
