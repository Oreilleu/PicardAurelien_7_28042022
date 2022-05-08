/*
  Warnings:

  - You are about to drop the column `picture` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `picture`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `picture`;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `postId` INTEGER NULL,
    `commentsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_commentsId_fkey` FOREIGN KEY (`commentsId`) REFERENCES `Comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
