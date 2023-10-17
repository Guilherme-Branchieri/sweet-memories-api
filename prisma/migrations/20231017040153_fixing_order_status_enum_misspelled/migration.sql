/*
  Warnings:

  - The values [CANCELED] on the enum `ORDER_STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ORDER_STATUS_new" AS ENUM ('PROCESSING', 'CANCELLED', 'FINISHED');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "ORDER_STATUS_new" USING ("status"::text::"ORDER_STATUS_new");
ALTER TYPE "ORDER_STATUS" RENAME TO "ORDER_STATUS_old";
ALTER TYPE "ORDER_STATUS_new" RENAME TO "ORDER_STATUS";
DROP TYPE "ORDER_STATUS_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PROCESSING';
COMMIT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" DROP NOT NULL;
