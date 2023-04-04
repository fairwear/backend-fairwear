-- CreateEnum
CREATE TYPE "role_enum" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "report_status_enum" AS ENUM ('SUBMITTED', 'PENDING', 'RESOLVED');

-- CreateEnum
CREATE TYPE "vote_enum" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "topic_id" INTEGER,

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_role" (
    "id" SERIAL NOT NULL,
    "name" "role_enum" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_to_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "report_reason" TEXT NOT NULL,
    "status" "report_status_enum" NOT NULL DEFAULT 'SUBMITTED',
    "comment" TEXT,
    "post_id" INTEGER NOT NULL,
    "resolved_by_id" INTEGER,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "brand_post" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "brand_post_pkey" PRIMARY KEY ("id")
);

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
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "date_sent" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_brand" (
    "list_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "topic_to_brand" (
    "topic_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user_to_topic" (
    "user_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "role_to_user" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "brand_post_vote" (
    "vote" "vote_enum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "brand_post_to_topic" (
    "is_bad" BOOLEAN NOT NULL DEFAULT false,
    "post_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "brand_post_to_item" (
    "post_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "topic_name_key" ON "topic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "topic_topic_id_key" ON "topic"("topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_role_name_key" ON "user_to_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "item_name_key" ON "item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "brand_name_key" ON "brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "report_id_key" ON "report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_post_id_key" ON "report"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "report_author_id_key" ON "report"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "email_template_name_key" ON "email_template"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_brand_list_name_key" ON "user_to_brand"("list_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_brand_user_id_brand_id_key" ON "user_to_brand"("user_id", "brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "topic_to_brand_topic_id_brand_id_key" ON "topic_to_brand"("topic_id", "brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_topic_user_id_topic_id_key" ON "user_to_topic"("user_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_to_user_user_id_role_id_key" ON "role_to_user"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "brand_post_vote_user_id_post_id_key" ON "brand_post_vote"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "brand_post_to_topic_post_id_topic_id_key" ON "brand_post_to_topic"("post_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "brand_post_to_item_post_id_item_id_key" ON "brand_post_to_item"("post_id", "item_id");

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand" ADD CONSTRAINT "brand_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "brand_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_resolved_by_id_fkey" FOREIGN KEY ("resolved_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post" ADD CONSTRAINT "brand_post_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post" ADD CONSTRAINT "brand_post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_brand" ADD CONSTRAINT "user_to_brand_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_brand" ADD CONSTRAINT "user_to_brand_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_to_brand" ADD CONSTRAINT "topic_to_brand_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_to_brand" ADD CONSTRAINT "topic_to_brand_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_topic" ADD CONSTRAINT "user_to_topic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_topic" ADD CONSTRAINT "user_to_topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_user" ADD CONSTRAINT "role_to_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_user" ADD CONSTRAINT "role_to_user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_to_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_vote" ADD CONSTRAINT "brand_post_vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_vote" ADD CONSTRAINT "brand_post_vote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "brand_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_to_topic" ADD CONSTRAINT "brand_post_to_topic_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "brand_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_to_topic" ADD CONSTRAINT "brand_post_to_topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_to_item" ADD CONSTRAINT "brand_post_to_item_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "brand_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_to_item" ADD CONSTRAINT "brand_post_to_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
