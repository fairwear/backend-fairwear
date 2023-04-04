/*
  Warnings:

  - You are about to drop the column `status` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Subtopic` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[topic_id]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `topic_id` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role_enum" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "status_enum" AS ENUM ('SUBMITTED', 'PENDING', 'RESOLVED');

-- DropForeignKey
ALTER TABLE "Subtopic" DROP CONSTRAINT "Subtopic_topic_id_fkey";

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "topic_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "report" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role";

-- DropTable
DROP TABLE "Subtopic";

-- DropEnum
DROP TYPE "status";

-- DropEnum
DROP TYPE "userrole";

-- CreateTable
CREATE TABLE "user_to_role" (
    "id" SERIAL NOT NULL,
    "name" "role_enum" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_to_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_to_user" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "status_to_report" (
    "report_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "report_to_status" (
    "id" SERIAL NOT NULL,
    "status" "status_enum" NOT NULL DEFAULT 'SUBMITTED',

    CONSTRAINT "report_to_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_to_role_name_key" ON "user_to_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_to_user_user_id_role_id_key" ON "role_to_user"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "status_to_report_status_id_report_id_key" ON "status_to_report"("status_id", "report_id");

-- CreateIndex
CREATE UNIQUE INDEX "report_to_status_status_key" ON "report_to_status"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_topic_id_key" ON "Topic"("topic_id");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_user" ADD CONSTRAINT "role_to_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_user" ADD CONSTRAINT "role_to_user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_to_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_to_report" ADD CONSTRAINT "status_to_report_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_to_report" ADD CONSTRAINT "status_to_report_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "report_to_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
