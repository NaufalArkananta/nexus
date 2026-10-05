/*
  Warnings:

  - Added the required column `desaKelurahan` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kecamatan` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinsi` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hospital` ADD COLUMN `desaKelurahan` VARCHAR(191) NOT NULL,
    ADD COLUMN `kecamatan` VARCHAR(191) NOT NULL,
    ADD COLUMN `provinsi` VARCHAR(191) NOT NULL;
