/*
  Warnings:

  - A unique constraint covering the columns `[barcode]` on the table `item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "barcode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "item_barcode_key" ON "item"("barcode");
