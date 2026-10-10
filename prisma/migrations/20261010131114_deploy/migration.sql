/*
  Warnings:

  - Added the required column `golDarah` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `golDarah` VARCHAR(191) NOT NULL;
