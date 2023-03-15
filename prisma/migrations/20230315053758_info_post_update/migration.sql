/*
  Warnings:

  - The values [upvote,downvote] on the enum `vote_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "vote_enum_new" AS ENUM ('UPVOTE', 'DONWVOTE');
ALTER TABLE "info_post_vote" ALTER COLUMN "vote" TYPE "vote_enum_new" USING ("vote"::text::"vote_enum_new");
ALTER TYPE "vote_enum" RENAME TO "vote_enum_old";
ALTER TYPE "vote_enum_new" RENAME TO "vote_enum";
DROP TYPE "vote_enum_old";
COMMIT;
