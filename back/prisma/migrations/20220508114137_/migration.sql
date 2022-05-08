/*
  Warnings:

  - Added the required column `image` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Made the column `postId` on table `image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_postId_fkey`;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    MODIFY `postId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
