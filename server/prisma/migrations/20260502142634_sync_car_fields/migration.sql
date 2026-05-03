/*
  Warnings:

  - You are about to drop the column `brand` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerDay` on the `Car` table. All the data in the column will be lost.
  - Added the required column `category` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trans` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "brand",
DROP COLUMN "model",
DROP COLUMN "pricePerDay",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "trans" TEXT NOT NULL;
