/*
  Warnings:

  - The primary key for the `like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `like` table. All the data in the column will be lost.
  - Made the column `userId` on table `like` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `like` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_postId_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_userId_fkey`;

-- AlterTable
ALTER TABLE `like` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `userId` INTEGER NOT NULL,
    MODIFY `postId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
