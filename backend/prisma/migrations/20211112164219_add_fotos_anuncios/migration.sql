-- CreateTable
CREATE TABLE `FotosAnuncios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(255) NOT NULL,
    `mimeType` VARCHAR(255) NOT NULL,
    `anuncioId` INTEGER NOT NULL,

    UNIQUE INDEX `FotosAnuncios_path_key`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FotosAnuncios` ADD CONSTRAINT `FotosAnuncios_anuncioId_fkey` FOREIGN KEY (`anuncioId`) REFERENCES `Anuncio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
