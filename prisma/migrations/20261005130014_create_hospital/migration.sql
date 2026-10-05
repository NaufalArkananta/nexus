-- CreateTable
CREATE TABLE `Hospital` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaRumahSakit` VARCHAR(191) NOT NULL,
    `jenisRumahSakit` VARCHAR(191) NOT NULL,
    `kelasTipe` VARCHAR(191) NOT NULL,
    `statusKepemilikan` VARCHAR(191) NOT NULL,
    `nomorIzinOperasional` VARCHAR(191) NOT NULL,
    `alamatLengkap` VARCHAR(191) NOT NULL,
    `kabupatenKota` VARCHAR(191) NOT NULL,
    `nomorTelepon` VARCHAR(191) NOT NULL,
    `emailResmi` VARCHAR(191) NOT NULL,
    `namaPIC` VARCHAR(191) NOT NULL,
    `emailPIC` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `dokumenIzinOperasional` VARCHAR(191) NOT NULL,
    `persetujuan` BOOLEAN NOT NULL,
    `statusVerifikasi` ENUM('MENUNGGU', 'DISETUJUI', 'DITOLAK') NOT NULL DEFAULT 'MENUNGGU',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Hospital_nomorIzinOperasional_key`(`nomorIzinOperasional`),
    UNIQUE INDEX `Hospital_emailResmi_key`(`emailResmi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
