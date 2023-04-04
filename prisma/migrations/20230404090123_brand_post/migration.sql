-- CreateEnum
CREATE TYPE "vote_enum" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateTable
CREATE TABLE "brand_post" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "brand_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "brand_post_pkey" PRIMARY KEY ("id")
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
    "post_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "is_bad" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "brand_post_to_item" (
    "post_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "brand_post_vote_user_id_post_id_key" ON "brand_post_vote"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "brand_post_to_topic_post_id_topic_id_key" ON "brand_post_to_topic"("post_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "brand_post_to_item_post_id_item_id_key" ON "brand_post_to_item"("post_id", "item_id");

-- AddForeignKey
ALTER TABLE "brand_post" ADD CONSTRAINT "brand_post_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post" ADD CONSTRAINT "brand_post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_vote" ADD CONSTRAINT "brand_post_vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_vote" ADD CONSTRAINT "brand_post_vote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "brand_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_to_topic" ADD CONSTRAINT "brand_post_to_topic_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "brand_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_to_topic" ADD CONSTRAINT "brand_post_to_topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_to_item" ADD CONSTRAINT "brand_post_to_item_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "brand_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_post_to_item" ADD CONSTRAINT "brand_post_to_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
