/*
  Warnings:

  - You are about to drop the column `references` on the `brand_post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "brand_post" DROP COLUMN "references";

-- CreateTable
CREATE TABLE "brand_post_reference" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,
    "body" TEXT,
    "source_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "brand_post_reference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "brand_post_reference" ADD CONSTRAINT "brand_post_reference_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "brand_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
