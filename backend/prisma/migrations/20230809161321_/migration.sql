-- AlterTable
ALTER TABLE `owner` ADD COLUMN `addresscsz` VARCHAR(191) NULL,
    ADD COLUMN `mailing` VARCHAR(191) NULL,
    ADD COLUMN `postalCode` VARCHAR(191) NULL,
    ADD COLUMN `type` VARCHAR(191) NULL;