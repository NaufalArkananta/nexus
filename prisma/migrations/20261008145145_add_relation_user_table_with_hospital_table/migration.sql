/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Hospital` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Hospital_userId_key` ON `Hospital`(`userId`);

-- AddForeignKey
ALTER TABLE `Hospital` ADD CONSTRAINT `Hospital_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
