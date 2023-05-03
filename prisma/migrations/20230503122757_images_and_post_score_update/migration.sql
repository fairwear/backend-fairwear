-- AlterTable
ALTER TABLE "brand" ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "brand_post" ALTER COLUMN "post_score" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "image_url" TEXT;
