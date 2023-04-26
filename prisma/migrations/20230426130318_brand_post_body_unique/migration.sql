/*
  Warnings:

  - A unique constraint covering the columns `[body]` on the table `brand_post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "brand_post_body_key" ON "brand_post"("body");
