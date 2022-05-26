/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_postId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `admin` INTEGER NULL;

-- DropTable
DROP TABLE `comments`;
