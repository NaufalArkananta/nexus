-- AlterTable
ALTER TABLE `berita` ADD COLUMN `readMinutes` INTEGER NULL,
    ADD COLUMN `status` ENUM('DRAF', 'TERBIT') NOT NULL DEFAULT 'DRAF';

-- CreateIndex
CREATE INDEX `Berita_status_idx` ON `Berita`(`status`);
