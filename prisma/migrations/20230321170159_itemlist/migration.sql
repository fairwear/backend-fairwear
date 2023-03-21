/*
  Warnings:

  - You are about to drop the `user_to_item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_to_item" DROP CONSTRAINT "user_to_item_item_id_fkey";

-- DropForeignKey
ALTER TABLE "user_to_item" DROP CONSTRAINT "user_to_item_user_id_fkey";

-- DropTable
DROP TABLE "user_to_item";

-- CreateTable
CREATE TABLE "item_list" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "item_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_list_to_item" (
    "item_id" INTEGER NOT NULL,
    "item_list_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "item_list_user_id_name_key" ON "item_list"("user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "item_list_to_item_item_id_item_list_id_key" ON "item_list_to_item"("item_id", "item_list_id");

-- AddForeignKey
ALTER TABLE "item_list" ADD CONSTRAINT "item_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_list_to_item" ADD CONSTRAINT "item_list_to_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_list_to_item" ADD CONSTRAINT "item_list_to_item_item_list_id_fkey" FOREIGN KEY ("item_list_id") REFERENCES "item_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
