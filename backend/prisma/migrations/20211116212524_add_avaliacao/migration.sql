-- CreateTable
CREATE TABLE `Avaliacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nota` INTEGER NOT NULL,
    `cometario` VARCHAR(255) NOT NULL,
    `autorId` INTEGER NOT NULL,
    `anuncioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_anuncioId_fkey` FOREIGN KEY (`anuncioId`) REFERENCES `Anuncio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
