-- CreateEnum
CREATE TYPE "vote_enum" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateTable
CREATE TABLE "info_post" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "info_post_to_topic" (
    "info_post_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "info_post_vote" (
    "id" SERIAL NOT NULL,
    "vote" "vote_enum" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "info_post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "info_post_id_key" ON "info_post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "info_post_author_id_key" ON "info_post"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "info_post_item_id_key" ON "info_post"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "info_post_to_topic_info_post_id_topic_id_key" ON "info_post_to_topic"("info_post_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "info_post_vote_id_key" ON "info_post_vote"("id");

-- CreateIndex
CREATE UNIQUE INDEX "info_post_vote_user_id_key" ON "info_post_vote"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "info_post_vote_info_post_id_key" ON "info_post_vote"("info_post_id");

-- CreateIndex
CREATE UNIQUE INDEX "info_post_vote_user_id_info_post_id_key" ON "info_post_vote"("user_id", "info_post_id");

-- AddForeignKey
ALTER TABLE "info_post" ADD CONSTRAINT "info_post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_post" ADD CONSTRAINT "info_post_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_post_to_topic" ADD CONSTRAINT "info_post_to_topic_info_post_id_fkey" FOREIGN KEY ("info_post_id") REFERENCES "info_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_post_to_topic" ADD CONSTRAINT "info_post_to_topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_post_vote" ADD CONSTRAINT "info_post_vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_post_vote" ADD CONSTRAINT "info_post_vote_info_post_id_fkey" FOREIGN KEY ("info_post_id") REFERENCES "info_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
