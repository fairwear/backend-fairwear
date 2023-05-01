/*
  Warnings:

  - Added the required column `post_score` to the `brand_post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `brand_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brand_post" ADD COLUMN     "post_score" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "references" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "user_trust_score" DOUBLE PRECISION NOT NULL DEFAULT 0.5;
