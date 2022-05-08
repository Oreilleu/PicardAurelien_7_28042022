-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_commentsId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_postId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_commentsId_fkey` FOREIGN KEY (`commentsId`) REFERENCES `Comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
