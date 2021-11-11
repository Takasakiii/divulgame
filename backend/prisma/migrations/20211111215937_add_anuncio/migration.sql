-- CreateTable
CREATE TABLE `Anuncio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `tipoAnuncio` INTEGER NOT NULL,
    `meiId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anuncio` ADD CONSTRAINT `Anuncio_meiId_fkey` FOREIGN KEY (`meiId`) REFERENCES `Mei`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
