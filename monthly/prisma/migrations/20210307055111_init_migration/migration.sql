-- CreateTable
CREATE TABLE `File` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storageID` INTEGER NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `path` LONGTEXT NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Ready', 'Succeeded', 'Failed') NOT NULL DEFAULT 'Ready',
    `error` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Row` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileId` INTEGER NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_guf` INTEGER NOT NULL,
    `shem_guf` VARCHAR(191) NOT NULL,
    `taarich_hafakat_hadoch` DATETIME(3) NOT NULL,
    `id_hevra` INTEGER NOT NULL,
    `tkufat_hakama` VARCHAR(191) NOT NULL,
    `tkufat_divuach` DATETIME(3) NOT NULL,
    `tsua_mitz_mi_thilat_hashana` DOUBLE NOT NULL,
    `tsua_hodshit` DOUBLE NOT NULL,
    `tsua_memuzaat36_hodashim` DOUBLE NOT NULL,
    `tsua_memuzaat60_hodashim` DOUBLE NOT NULL,
    `tsua_mitztaberet36_hodashim` DOUBLE NOT NULL,
    `tsua_mitztaberet60_hodashim` DOUBLE NOT NULL,
    `tsua_shnatit_memuzaat3_shanim` DOUBLE NOT NULL,
    `tsua_shnatit_memuzaat5_shanim` DOUBLE NOT NULL,
    `stiat_teken36_hodashim` DOUBLE NOT NULL,
    `stiat_teken60_hodashim` DOUBLE NOT NULL,
    `yit_nchasim_bfoal` DOUBLE NOT NULL,
    `shiur_d_nihul_nechasim` DOUBLE NOT NULL,
    `shiur_d_nihul_hafkadot` DOUBLE NOT NULL,
    `sharp_tsua_hezyonit_anaf` DOUBLE NOT NULL,
    `sharp_ribit_hasrat_sikun` DOUBLE NOT NULL,
    `alpha_shnati` DOUBLE NOT NULL,
    `beta_ta100` DOUBLE NOT NULL,
    `beta_agach_kontzerniot_tzmudot` DOUBLE NOT NULL,
    `beta_agach_mem_lo_tzmudot` DOUBLE NOT NULL,
    `beta_agach_memshaltiot_tzmudot` DOUBLE NOT NULL,
    `beta_hutz_laaretz` DOUBLE NOT NULL,
    `r_squared` DOUBLE NOT NULL,
    `yahas_nezilut` DOUBLE NOT NULL,
    `num_hevra` INTEGER NOT NULL,
    `taarich_sium_peilut` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
