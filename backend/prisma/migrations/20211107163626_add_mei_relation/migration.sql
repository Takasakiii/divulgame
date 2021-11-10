/*
  Warnings:

  - A unique constraint covering the columns `[meiId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `meiId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Mei` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(18) NOT NULL,
    `nomeFantasia` VARCHAR(255) NOT NULL,
    `razaoSocial` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Mei_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_meiId_key` ON `Usuario`(`meiId`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_meiId_fkey` FOREIGN KEY (`meiId`) REFERENCES `Mei`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
