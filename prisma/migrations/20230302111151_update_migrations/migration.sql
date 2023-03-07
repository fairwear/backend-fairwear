-- CreateEnum
CREATE TYPE "userrole" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('Submited', 'Seen', 'Resolved');

-- CreateTable
CREATE TABLE "email_template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "email_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date_sent" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtopic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "Subtopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_to_topic" (
    "item_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_to_brand" (
    "topic_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user_to_item" (
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "list_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_to_topic" (
    "user_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "userrole" NOT NULL DEFAULT 'User',
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER NOT NULL,
    "report_reason" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'Submited',
    "item_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "email_template_name_key" ON "email_template"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subtopic_name_key" ON "Subtopic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "item_to_topic_item_id_topic_id_key" ON "item_to_topic"("item_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "topic_to_brand_topic_id_brand_id_key" ON "topic_to_brand"("topic_id", "brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_item_list_name_key" ON "user_to_item"("list_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_item_user_id_item_id_key" ON "user_to_item"("user_id", "item_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_topic_user_id_topic_id_key" ON "user_to_topic"("user_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "report_id_key" ON "report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_author_id_key" ON "report"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "report_item_id_key" ON "report"("item_id");

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtopic" ADD CONSTRAINT "Subtopic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_to_topic" ADD CONSTRAINT "item_to_topic_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_to_topic" ADD CONSTRAINT "item_to_topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_to_brand" ADD CONSTRAINT "topic_to_brand_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_to_brand" ADD CONSTRAINT "topic_to_brand_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_item" ADD CONSTRAINT "user_to_item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_item" ADD CONSTRAINT "user_to_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_topic" ADD CONSTRAINT "user_to_topic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_topic" ADD CONSTRAINT "user_to_topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
